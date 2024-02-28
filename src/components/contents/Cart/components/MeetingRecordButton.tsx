import { x } from '@xstyled/emotion';
import { Icon } from 'anolis-ui';
import { FC } from 'react';

import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import PenIcon from '@src/components/other/icons/24/pen.svg';

interface MeetingRecordButtonProps {
  isCartOpen: boolean;
}

const MeetingRecordButton: FC<MeetingRecordButtonProps> = ({ isCartOpen }) => {
  const useStore = useFormStoreContext();
  const { cart, isInternalUser } = useStore((state) => ({
    cart: state.cart,
    isInternalUser: state.isInternalUser,
  }));

  const { suitabilityRecordModal } = cart ?? {};

  if (!isInternalUser || !suitabilityRecordModal?.id) return null;

  return (
    <x.a
      href={`#modal=${suitabilityRecordModal.id}`}
      display={{ _: 'none', sm: isCartOpen ? 'none' : 'flex' }}
      alignItems="center"
      bg="transparent"
      color="primary.white"
      m="0"
      py="2rem"
      pl="1.25rem"
      pr="2.5rem"
      borderLeft="1px solid"
      borderColor="primary.white"
      borderRadius="0 4.5rem 4.5rem 0"
      outline={{
        _: 'none',
        '&:focus': 'none',
        '&:focus-visible': '3px solid',
      }}
      outlineOffset="-0.25rem"
      outlineColor={{
        '&:focus-visible': 'primary.white',
      }}
    >
      <Icon as="span" svg={<PenIcon />} fill="primary.white" />
      <x.span ml="1rem">Záznam z&nbsp;jednání</x.span>
    </x.a>
  );
};

export default MeetingRecordButton;
