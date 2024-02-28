import { useFieldApi, useFormApi } from "@data-driven-forms/react-form-renderer";
import { useEffect } from "react";

import { FORM_STORE_REFRESH_TRIGGER_KEY } from "@src/constants/fields";
import { useFormStoreContext } from "@src/hooks/useFormStoreContext";

/**
 * This custom hook registers a "fake" trigger field
 * within the form to ensure an immediate refresh in response to REST-related store updates.
 * It is particularly useful for triggering schema `resolveProps` and `condition`
 * functions without requiring direct user interaction.
 *
 * The "fake" field is not user-editable but serves as a mechanism to
 * listen to store changes. When store updates occur, the value of this field is toggled,
 * triggering the form to re-evaluate conditions and resolved properties.
 *
 * When you need to listen only for store changes inside the `condition`
 * function, you can do so with the `FORM_STORE_REFRESH_TRIGGER_KEY` variable.
 * This approach ensures you always get the latest value from the store.
 *
 * Example usage in a schema condition:
 *  {
 *    when: FORM_STORE_REFRESH_TRIGGER_KEY,
 *    is: () => {
 *      const data = getFetcherData("autosjednavac");
 *      return data?.onlinePaymentOnly;
 *    }
 *  }
 */
export const useFormStoreRefreshTrigger = (): void => {
  const { change } = useFormApi();
  const { input } = useFieldApi({ name: FORM_STORE_REFRESH_TRIGGER_KEY });
  const { value } = input;

  const useStore = useFormStoreContext();
  const { isFetchLoading, isFetchLoadingDebounce, fetcherData, fetcherReqBody } = useStore((state) => ({
    isFetchLoading: state.isFetchLoading,
    isFetchLoadingDebounce: state.isFetchLoadingDebounce,
    fetcherData: state.fetcherData,
    fetcherReqBody: state.fetcherReqBody
  }));

  useEffect(() => {
    change(FORM_STORE_REFRESH_TRIGGER_KEY, !value);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchLoading, isFetchLoadingDebounce, fetcherData, fetcherReqBody]);
};
