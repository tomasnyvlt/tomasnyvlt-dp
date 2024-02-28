import { useCallback, useEffect } from 'react';

import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import { useFormStoreRefreshTrigger } from '@src/hooks/useFormStoreRefreshTrigger';
import debounce from '@src/utils/debounce';

const useFormStoreSideEffects = (): void => {
  useFormStoreRefreshTrigger();

  const useStore = useFormStoreContext();
  const { isFetchLoading, setIsFetchLoadingDebounce } = useStore((state) => ({
    isFetchLoading: state.isFetchLoading,
    setIsFetchLoadingDebounce: state.setIsFetchLoadingDebounce,
  }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setDebounceLoading = useCallback(
    debounce((isLoading: boolean) => {
      setIsFetchLoadingDebounce(isLoading);
    }, 200),
    []
  );

  useEffect(() => {
    setDebounceLoading(isFetchLoading);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetchLoading]);
};

export { useFormStoreSideEffects };
