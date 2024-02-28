import { useFormApi } from '@data-driven-forms/react-form-renderer';
import { FC, useEffect } from 'react';

import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import { FIELD_NAMES } from '@src/schema/schemas/constants/fieldNames';

const DISCOUNT_PRODUCT_ID = 'PR0550001';
const ATTR_SCHEMA_MTPL = 'RULES_POV';
const ATTR_SCHEMA_CASCO = 'RULES_HAV';

const DiscountSettings: FC = () => {
  const { change } = useFormApi();

  const useStore = useFormStoreContext();
  const { discountLimits, isAgent } = useStore((state) => ({
    discountLimits: state.discountLimits,
    isAgent: state.isAgent,
  }));

  /**
   * This useEffect is called based on data changes from `start` EP which is called only once,
   * so it is safe to depend on it for whole form lifecycle.
   */
  useEffect(() => {
    const limits = discountLimits?.filter(
      ({ productId }) => productId === DISCOUNT_PRODUCT_ID
    );

    if (!limits?.length) return;

    /**
     * These limits will be used as `max` values of range inputs
     * for MTPL and CASCO discounts for all user types
     * as well as `initialValue` only for `isAgent` users.
     *
     * Other users will have `initialValue` taken from `calculation` EP.
     * - mtpl.defaultSalesDiscount and casco.defaultSalesDiscount
     * in: @src/components/fetchers/AutoSjednavacFetchField/index.tsx
     */
    const mtplLimit = Number(
      limits.find(({ attrSchema }) => attrSchema === ATTR_SCHEMA_MTPL)?.value
    );
    const cascoLimit = Number(
      limits.find(({ attrSchema }) => attrSchema === ATTR_SCHEMA_CASCO)?.value
    );

    if (Number.isNaN(mtplLimit) || Number.isNaN(cascoLimit)) return;

    change(FIELD_NAMES.DISCOUNT.MTPL_MAX, mtplLimit);
    change(FIELD_NAMES.DISCOUNT.CASCO_MAX, cascoLimit);

    if (!isAgent) return;

    change(FIELD_NAMES.DISCOUNT.MTPL_NAME, mtplLimit);
    change(FIELD_NAMES.DISCOUNT.CASCO_NAME, mtplLimit);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discountLimits, isAgent]);

  return null;
};

export default DiscountSettings;
