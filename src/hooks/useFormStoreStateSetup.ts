import { createRef, useEffect } from 'react';

import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import getSpyFields, { SpyFieldValueType } from '@src/utils/getSpyFields';

// Initialize main store values
const useFormStoreStateSetup = (): void => {
  const useStore = useFormStoreContext();

  const { flattenFields, setAllSpyFieldRefValues, setUserData } = useStore(
    (state) => ({
      flattenFields: state.flattenFields,
      setAllSpyFieldRefValues: state.setAllSpyFieldRefValues,
      setUserData: state.setUserData,
    })
  );

  useEffect(() => {
    setUserData({
      isAgent: false,
      isInternalUser: false,
      discountLimits: [],
    });
  }, [setUserData]);

  useEffect(() => {
    const spyFieldsRef = createRef<Record<string, SpyFieldValueType>>();
    // @ts-ignore
    spyFieldsRef.current = getSpyFields(flattenFields);

    setAllSpyFieldRefValues(spyFieldsRef);
  }, [flattenFields, setAllSpyFieldRefValues]);
};

export { useFormStoreStateSetup };
