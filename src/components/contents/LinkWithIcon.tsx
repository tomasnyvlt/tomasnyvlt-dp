import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook';
import { x } from '@xstyled/emotion';
import { Icon } from 'anolis-ui';
import { FC } from 'react';

import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import { LinkWithIconType } from '@src/types/layout';
import DownloadIcon from '@src/components/other/icons/24/download.svg?react';

const LinkWithIcon: FC<LinkWithIconType> = ({
  as,
  css,
  href,
  withIcon,
  onClick,
  ...props
}) => {
  const { input } = useFieldApi(props);
  const sendDataToGTM = useGTMDispatch();
  const useStore = useFormStoreContext();
  const { pageMainCategory } = useStore((state) => state.dataLayer) || {};

  return (
    <x.div
      onClick={() =>
        sendDataToGTM({
          event: `${pageMainCategory ?? ''}_sjednavac_link_with_icon_${input.value}`,
        })
      }
    >
      <x.a
        as={as}
        onClick={as === 'button' ? onClick : undefined}
        href={as === 'a' ? href : undefined}
        target={as === 'a' ? '_blank' : undefined}
        type={as === 'button' ? 'button' : undefined}
        display="flex"
        alignItems="center"
        w="100%"
        color="grayscale.gray1"
        background={as === 'button' ? 'transparent' : 'inherit'}
      >
        {withIcon && <Icon svg={<DownloadIcon />} fill="grayscale.gray1" />}
        <x.span
          textDecoration={as === 'button' ? 'underline' : 'initial'}
          ml="1.25rem"
          color="grayscale.gray1"
          fontSize="0.875rem"
          lineHeight="1.125rem"
          {...css}
        >
          {input.value}
        </x.span>
      </x.a>
    </x.div>
  );
};

export default LinkWithIcon;
