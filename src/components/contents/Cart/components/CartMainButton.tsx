import styled, { x } from '@xstyled/emotion';
import { Icon } from 'anolis-ui';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import { getFormattedPrice } from '@src/utils/getFormattedPrice';
import ArrowDownIcon from '@src/components/other/icons/24/arrow-down.svg?react';
import Skeleton from '@src/components/other/Skeleton';
import BasketIconSmall from '@src/components/other/icons/16/basket.svg?react';
import BasketIcon from '@src/components/other/icons/24/basket.svg?react';

interface CartMainButtonProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  itemsCount: number;
  finalPrice: number;
  buttonId: string;
  contentId: string;
}

const CartMainButton: FC<CartMainButtonProps> = ({
  finalPrice,
  isOpen,
  itemsCount,
  setIsOpen,
  buttonId,
  contentId,
}) => {
  const useStore = useFormStoreContext();
  const { isInternalUser, isAgent, isFetchLoading, fetcherData } = useStore(
    (state) => ({
      isInternalUser: state.isInternalUser,
      isAgent: state.isAgent,
      isFetchLoading: state.isFetchLoading,
      fetcherData: state.fetcherData,
    })
  );

  // Make loading state true on initial render to prevent price flashing
  const [isLoading, setIsLoading] = useState(true);

  const hasRightSideButton = isInternalUser || isAgent;

  useEffect(() => {
    setIsLoading(isFetchLoading);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchLoading]);

  return (
    <x.button
      type="button"
      onClick={() => setIsOpen((prevOpen) => !prevOpen)}
      id={buttonId}
      aria-controls={contentId}
      aria-expanded={isOpen}
      display="flex"
      flex="1"
      alignItems="center"
      color="primary.white"
      bg="transparent"
      m="0"
      p="1rem"
      pr={{
        sm: hasRightSideButton ? '1.25rem' : '2rem',
      }}
      borderRadius={{
        _: isOpen ? '4.5rem' : '4.5rem 0 0 4.5rem',
        sm: hasRightSideButton ? '4.5rem 0 0 4.5rem' : '4.5rem',
      }}
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
      {/* Cart icon */}
      <x.span
        display="block"
        position="relative"
        borderRadius="50%"
        bg="primary.white"
        p={{
          _: '0.625rem',
          sm: '1rem',
        }}
      >
        <Icon
          as="span"
          svg={<BasketIconSmall />}
          display={{ _: 'flex', sm: 'none' }}
        />
        <Icon
          as="span"
          svg={<BasketIcon />}
          display={{ _: 'none', sm: 'flex' }}
        />

        <StyledItemsCount
          display={{ _: 'none', sm: isOpen ? 'none' : 'flex' }}
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top="0"
          left="calc(100% - 0.75rem)"
          bg="primary.white"
          color="tercial.indigo2"
          borderRadius="50%"
          fontSize="0.875rem"
          fontWeight="600"
          lineHeight="1.25rem"
          w="1.75rem"
          h="1.75rem"
        >
          {itemsCount}
        </StyledItemsCount>
      </x.span>

      {/* Text */}
      <x.span
        display="flex"
        flex="1"
        justifyContent="space-between"
        alignItems="center"
        ml={{ _: isOpen ? '1rem' : '0.875rem', sm: '1.5rem' }}
        mr={isOpen ? '0' : { _: '0.25rem', sm: '1.5rem' }}
      >
        {isOpen ? (
          <x.span
            display="block"
            fontSize={{ _: '1rem', sm: '1.5rem' }}
            fontWeight="500"
            lineHeight={{ _: '1.25rem', sm: '1.75rem' }}
          >
            Kalkulace pojištění
          </x.span>
        ) : (
          <>
            <x.span
              display={{ _: 'none', sm: 'block' }}
              fontSize="0.75rem"
              fontWeight="500"
              lineHeight="1rem"
            >
              Celkem za pojištění
            </x.span>
            <x.span
              display="block"
              fontSize={{ _: '0.875rem', sm: '1.375rem' }}
              fontWeight="500"
              lineHeight={{ _: '1.125rem', sm: '1.625rem' }}
            >
              {isLoading ? (
                <Skeleton
                  skeletonColor="purple"
                  skeletonProps={{ height: 30, width: 160 }}
                />
              ) : (
                getFormattedPrice({
                  price: finalPrice,
                  withYear: !isInternalUser && !fetcherData.shortTerm,
                })
              )}
            </x.span>
          </>
        )}
      </x.span>

      {/* Arrow icon */}
      <x.span display="block">
        <Icon
          as="span"
          svg={<ArrowDownIcon />}
          fill="primary.white"
          transform={isOpen ? 'rotate(0)' : 'rotate(180deg)'}
          transition="transform 300ms"
        />
      </x.span>
    </x.button>
  );
};

export default CartMainButton;

const StyledItemsCount = styled(x.span)`
  filter: drop-shadow(0 2.71rem 17.05rem rgba(0, 0, 0, 0.15))
    drop-shadow(0 1.12rem 7.05rem rgba(0, 0, 0, 0.11))
    drop-shadow(0 0.6rem 3.77rem rgba(0, 0, 0, 0.09))
    drop-shadow(0 0.32rem 2.11rem rgba(0, 0, 0, 0.08))
    drop-shadow(0 0.13rem 0.85rem rgba(0, 0, 0, 0.06))
    drop-shadow(0 0.06rem 0.39rem rgba(0, 0, 0, 0.04));
`;
