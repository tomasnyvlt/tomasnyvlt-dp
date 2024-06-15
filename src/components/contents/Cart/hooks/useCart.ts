import { useFormApi } from '@data-driven-forms/react-form-renderer';
import { default as WizardContext } from '@data-driven-forms/react-form-renderer/wizard-context';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { CartDataType, ChangeProps } from '@src/components/contents/Cart/types';
import { getCartDataFromFetcher } from '@src/components/contents/Cart/utils/getCartDataFromFetcher';
import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import { WizardType } from '@src/types';
import { formFetcherType } from '@src/formTypes.ts';

interface ExtendedCartDataType extends CartDataType {
  itemsCount: number;
}

interface Output {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  cartData: ExtendedCartDataType;
  deleteItem: (attr: ChangeProps) => void;
  isAgentOpen: boolean;
  setIsAgentOpen: Dispatch<SetStateAction<boolean>>;
  hasVisibleCartFields: boolean;
}

const useCart = (): Output => {
  const { change, getState, getFieldState } = useFormApi();

  const useStore = useFormStoreContext();
  const { cart, fetcherData } = useStore((state) => ({
    cart: state.cart,
    fetcherData: state.fetcherData,
  }));

  const { cartFields } = cart || {};
  const { values } = getState();

  const { formOptions } = useContext(WizardContext);
  const { formType } = formOptions.schema.fields[0] as WizardType;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartData, setCartData] = useState<ExtendedCartDataType>({
    finalPrice: 0,
    discountArr: [],
    items: [],
    itemsCount: 0,
  });
  const [isAgentOpen, setIsAgentOpen] = useState<boolean>(false);

  const deleteItem = useCallback(
    ({ fieldName, value }: ChangeProps) => {
      change(fieldName, value);
    },
    [change]
  );

  const visibleCartFields = cartFields
    ?.map((field) => getFieldState(field.name))
    .filter((field) => field?.name);
  const visibleActiveCartFieldsLength: number =
    visibleCartFields?.filter((field) => field?.value as boolean)?.length ?? 0;

  useEffect(() => {
    if (!formFetcherType.includes(formType as any)) return; // TODO:

    const updatedCartData = getCartDataFromFetcher({
      fetcherData,
      formType,
      formValues: values,
    });

    setCartData({
      ...updatedCartData,
      itemsCount:
        (updatedCartData?.items?.length ?? 0) + visibleActiveCartFieldsLength,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcherData, formType, visibleActiveCartFieldsLength]);

  // Close agent when cart is open
  useEffect(() => {
    if (!isOpen) return;

    setIsAgentOpen(false);
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
    cartData,
    deleteItem,
    isAgentOpen,
    setIsAgentOpen,
    hasVisibleCartFields: !!visibleCartFields?.length,
  };
};

export { useCart };
