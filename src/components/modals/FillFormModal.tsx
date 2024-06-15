import { x } from '@xstyled/emotion';
import { useModal } from 'anolis-ui';

import { FC, useState } from 'react';

import { FetcherResponseType, FormFetcherType } from '@src/formTypes';
import setFormValuesFromDataObject from '@src/utils/setFormValuesFromDataObject';
import dpApiFetch from '@src/utils/TO_DELETE_dpApiFetch';
import { Basic } from '@src/components/contents/Modal.tsx';
import { useGetFillformId } from '@src/utils/useGetFillformId.ts';
import DirectButton from '@src/components/other/DirectButton.tsx';

interface FillFormModalProps {
  change: (name: string, value?: Record<string, any>) => void;
  localStorageKey: string;
}

const FillFormModal: FC<FillFormModalProps> = ({ change, localStorageKey }) => {
  const [close] = useModal();
  const [loading, setLoading] = useState(false);
  const fillform = useGetFillformId();

  const fetchFillFormData = async (
    id: string
  ): Promise<FetcherResponseType<FormFetcherType> | undefined> => {
    setLoading(true);

    try {
      const body = await dpApiFetch({
        method: 'GET',
        url: `/api/latest/rest/vehicle/insurance/v5/calculation/${id}/fillform`,
        headers: {
          'x-source': 'WEB_VEHICLE_R',
        },
      });

      const newLocalStorageObject = { ...body, preloaded: true };
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(newLocalStorageObject)
      );

      setLoading(false);
      return newLocalStorageObject;
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log(error);
      return undefined;
    }
  };

  const fetchFillForm = async (id: string) => {
    const data = await fetchFillFormData(id);

    if (data) {
      setFormValuesFromDataObject({ change, data });
    }

    close();
  };

  return (
    <Basic headingText="Máte rozpracované sjednání">
      <x.p textAlign="center">
        Kliknutím na pokračovat se načte konfigurace pojištění:
        <br />
        &quot;<strong>{fillform}</strong>&quot;
      </x.p>

      <DirectButton
        v="gradient"
        onClick={() => fetchFillForm(fillform)}
        mt="3rem"
        loading={loading}
      >
        Pokračovat
      </DirectButton>
    </Basic>
  );
};

export default FillFormModal;
