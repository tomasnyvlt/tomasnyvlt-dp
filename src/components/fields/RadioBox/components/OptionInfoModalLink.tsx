import { x } from '@xstyled/emotion';
import { useModal } from 'anolis-ui';
import { FC } from 'react';

import { RadioBoxInfoModalType } from '@src/types';

import Richtext from '@src/components/other/Richtext';
import { Basic } from '@src/components/contents/Modal';

const OptionInfoModalLink: FC<RadioBoxInfoModalType> = ({
  modalLinkText,
  modal,
}) => {
  const [openModal] = useModal(Basic);

  return (
    <x.button
      type="button"
      pointerEvents="auto"
      p="0"
      h="fit-content"
      w="fit-content"
      color="inherit"
      fontSize="inherit"
      fontWeight="inherit"
      lineHeight="inherit"
      textAlign="left"
      textDecoration="underline"
      background={{ _: 'none', hover: 'none', focus: 'none' }}
      border={{ _: 'none', hover: 'none', focus: 'none' }}
      outline={{
        '&:focus': 'none',
        '&:focus-visible': '2px solid',
      }}
      outlineColor={{ '&:focus-visible': 'primary.greenDirect' }}
      outlineOffset={0}
      onClick={() =>
        openModal({
          headingText: modal.heading,
          content: (
            <x.div w="100%" px="2rem">
              <Richtext data={modal.content} />
            </x.div>
          ),
        })
      }
    >
      {modalLinkText}
    </x.button>
  );
};

export default OptionInfoModalLink;
