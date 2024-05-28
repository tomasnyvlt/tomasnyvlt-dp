import { useFormApi } from '@data-driven-forms/react-form-renderer';
import { default as WizardContext } from '@data-driven-forms/react-form-renderer/wizard-context';
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook';
import { useModal } from 'anolis-ui';
import { useContext, useMemo } from 'react';

import {
  EmailInput,
  EmailSuccess,
  FetchError,
} from '@src/components/contents/Cart/components/ModalContent';
import {
  DownloadPdfResponseType,
  SendEmailResponseType,
} from '@src/components/contents/Cart/types';
import getTopbarRequestData, {
  TopbarRequestOutput,
} from '@src/components/contents/Cart/utils/getTopbarRequestData';
import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import { WizardType } from '@src/types';
import dpApiFetch from '@src/utils/TO_DELETE_dpApiFetch';
import { Basic } from '@src/components/contents/Modal';

interface Output {
  openEmailModal: () => void;
  downloadPdf: () => void;
}

const useTopbar = (): Output => {
  const useStore = useFormStoreContext();
  const { fetcherReqBody, dataLayer } = useStore((state) => ({
    fetcherReqBody: state.fetcherReqBody,
    dataLayer: state.dataLayer,
  }));

  const { getState } = useFormApi();
  const { formOptions } = useContext(WizardContext);
  const [openModal] = useModal(Basic);
  const [closeModal] = useModal();

  const { formType } = formOptions.schema.fields[0] as WizardType;
  const { values } = getState();

  const defaultEmail = values.partner?.email
    ? values.partner.email
    : values?.email ?? '';
  const sendDataToGTM = useGTMDispatch();

  const requestData: TopbarRequestOutput | null = useMemo(() => {
    return getTopbarRequestData(formType);
  }, [formType]);

  const handleFetchError = (error: unknown): void => {
    // eslint-disable-next-line no-console
    console.log(error);

    closeModal();
    openModal({
      headingText: 'Chyba při zpracování',
      content: <FetchError />,
    });
  };

  const sendEmail = async (email: string): Promise<void> => {
    const { url, headers } = requestData ?? {};

    try {
      if (!url?.email) {
        // eslint-disable-next-line no-throw-literal
        throw {
          message: 'email endpoint is not defined',
          status: 400,
        };
      }

      const response = await dpApiFetch<SendEmailResponseType>({
        method: 'POST',
        url: url.email,
        headers: headers?.email ?? {},
        body: {
          ...(fetcherReqBody ?? {}),
          sendToEmail: email,
          saveCalculation: true,
          sendToClient: true,
          getPackages: undefined,
          getApplicableLimitsOnly: undefined,
          getLimits: undefined,
        },
      });

      if (!response.sentToEmail) {
        // eslint-disable-next-line no-throw-literal
        throw {
          message: 'response.sentToEmail is false',
          status: 400,
        };
      }

      sendDataToGTM({
        event: `${dataLayer?.pageMainCategory ?? ''}_sjednavac_kosik_mail`,
      });

      closeModal();

      openModal({
        headingText: 'E-mail odeslán.',
        content: <EmailSuccess />,
      });
    } catch (error) {
      handleFetchError(error);
    }
  };

  const openEmailModal = (): void => {
    openModal({
      headingText: 'E-mail, na který bude kalkulace odeslána.',
      content: <EmailInput sendEmail={sendEmail} defaultEmail={defaultEmail} />,
    });
  };

  const downloadPdf = async (): Promise<void> => {
    const { url, headers } = requestData ?? {};

    try {
      if (!url?.pdf) {
        // eslint-disable-next-line no-throw-literal
        throw {
          message: 'pdf endpoint is not defined',
          status: 400,
        };
      }

      const response = await dpApiFetch<DownloadPdfResponseType>({
        method: 'POST',
        url: url.pdf,
        headers: headers?.pdf ?? {},
        body: fetcherReqBody,
      });

      if (!response?.offerDownloadLink?.href) {
        // eslint-disable-next-line no-throw-literal
        throw {
          message: 'response.offerDownloadLink.href is not provided',
          status: 400,
        };
      }

      const { href, rel = 'self' } = response.offerDownloadLink;
      const linkEl = document.createElement('a');
      linkEl.href = href;
      linkEl.rel = rel;

      linkEl.click();
      linkEl.remove();

      sendDataToGTM({
        event: `${dataLayer?.pageMainCategory ?? ''}_sjednavac_kosik_pdf`,
      });
    } catch (error) {
      handleFetchError(error);
    }
  };

  return { openEmailModal, downloadPdf };
};

export { useTopbar };
