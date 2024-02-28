import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook';
import styled, { th, x } from '@xstyled/emotion';
import { Icon } from 'anolis-ui';
import { FC } from 'react';

import CartFormField from '@src/components/contents/Cart/components/CartFormField';
import {
  CartItemType,
  CartItemTypeRemovable,
  ChangeProps,
} from '@src/components/contents/Cart/types';
import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import DirectButton from '@src/components/other/DirectButton';
import MultiplyIcon from '@src/components/other/icons/24/multiply.svg?react';

interface ContentItemsProps {
  items: CartItemType[];
  deleteItem: (attr: ChangeProps) => void;
  hasVisibleCartFields: boolean;
}

const ContentItems: FC<ContentItemsProps> = ({
  items,
  deleteItem,
  hasVisibleCartFields,
}) => {
  const useStore = useFormStoreContext();
  const { cart, dataLayer } = useStore((state) => ({
    cart: state.cart,
    dataLayer: state.dataLayer,
  }));

  const { cartFields } = cart || {};

  const sendDataToGTM = useGTMDispatch();

  if (!items?.length || !cartFields?.length) return null;

  return (
    <x.div
      bg="primary.white"
      pt={{ _: '1rem', sm: '1.5rem' }}
      overflow="hidden"
      display="flex"
      flexDirection="column"
    >
      <StyledContainer
        h="100%"
        overflow="auto"
        px={{ _: '1.5rem', sm: '2.5rem' }}
      >
        {items?.length &&
          (items as CartItemTypeRemovable[]).map(
            ({
              description,
              removable,
              formattedPrice,
              defaultFieldValue,
              fieldName,
              info,
            }) => (
              <x.div
                key={description}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py="1rem"
                borderBottom="1px solid"
                borderBottomColor="grayscale.gray4"
              >
                <x.div>
                  <x.p
                    fontSize="0.875rem"
                    lineHeight="1.125rem"
                    fontWeight="500"
                    color="primary.black"
                  >
                    {description}
                  </x.p>

                  {formattedPrice && (
                    <x.p
                      fontSize="1rem"
                      lineHeight="1.375rem"
                      fontWeight="500"
                      color="grayscale.gray2"
                    >
                      {formattedPrice}
                    </x.p>
                  )}

                  {info && (
                    <x.p
                      fontSize="0.875rem"
                      lineHeight="1.125rem"
                      fontWeight="500"
                      color="grayscale.gray2"
                    >
                      {info}
                    </x.p>
                  )}
                </x.div>

                {removable && (
                  <DirectButton
                    aria-label={`Odebrat položku ${description}`}
                    v="outline"
                    onClick={() => {
                      sendDataToGTM({
                        event: `${dataLayer?.pageMainCategory ?? ''}_sjednavac_kosik_odebrani`,
                        pojisteni: fieldName,
                      });
                      deleteItem({
                        fieldName,
                        value: defaultFieldValue,
                      });
                    }}
                    cursor="pointer"
                    p={0}
                    w="2.5rem"
                    h="2.5rem"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="100%"
                    flex="0 0 auto"
                    ml="1.25rem"
                    type="button"
                  >
                    <Icon svg={<MultiplyIcon />} fill="tercial.indigo1" />
                  </DirectButton>
                )}
              </x.div>
            )
          )}

        {cartFields?.length && (
          <x.div
            pt={hasVisibleCartFields ? '1rem' : 0}
            pb={hasVisibleCartFields ? { _: '1.375rem', sm: '1rem' } : 0}
            borderBottom={hasVisibleCartFields ? '1px solid' : 0}
            borderBottomColor="grayscale.gray4"
          >
            {cartFields.map((field) => (
              <CartFormField key={field.name} item={field} />
            ))}
          </x.div>
        )}
      </StyledContainer>
    </x.div>
  );
};

export default ContentItems;

const StyledContainer = styled(x.div)`
  @media (min-width: sm) {
    &::-webkit-scrollbar {
      width: 0.5rem;
    }

    &::-webkit-scrollbar-track {
      background-color: ${th('tercial.indigo5')};
      border-radius: 0.625rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${th('tercial.indigo1Alpha75')};
      border-radius: 0.625rem;
    }
  }
`;
