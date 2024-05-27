import { Field, useFormApi } from '@data-driven-forms/react-form-renderer';
import { x } from '@xstyled/emotion';
import { FC } from 'react';

import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import { CartFieldsType } from '@src/types';
import { getFormattedPrice } from '@src/utils/getFormattedPrice';
import { getValueByString } from '@src/utils/getValueByString';

interface CartFormFieldProps {
  item: CartFieldsType;
}

const CartFormField: FC<CartFormFieldProps> = ({ item }) => {
  const useStore = useFormStoreContext();
  const fetcherData = useStore((state) => state.fetcherData);

  const { description, priceFetcherDataAttr, ...field } = item;

  const { renderForm } = useFormApi();

  const getFieldDescription = (): string | null => {
    if (!priceFetcherDataAttr) return description ?? null;

    const price = getValueByString(priceFetcherDataAttr, fetcherData);
    const shortTerm = getValueByString('shortTerm', fetcherData);

    if (!price) return null;

    return getFormattedPrice({ price, withYear: !shortTerm });
  };

  return (
    <x.div mb={{ '&:not(:last-of-type)': '1rem' }}>
      <>
        {renderForm([
          { ...field, description: getFieldDescription() } as Field,
        ])}
      </>
    </x.div>
  );
};

export default CartFormField;
