import { FC, useCallback } from "react";

import OnBlurItem from "@src/components/controls/OnBlurListener/components/OnBlurItem";
import { useFormStoreContext } from "@src/hooks/useFormStoreContext";

const OnBlurListener: FC = () => {
  const useStore = useFormStoreContext();
  const { onBlurFieldNames, callToggleOnBlur } = useStore((state) => ({
    onBlurFieldNames: state.onBlurFieldNames,
    callToggleOnBlur: state.callToggleOnBlur
  }));

  const onBlurCallback = useCallback(() => {
    callToggleOnBlur();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!onBlurFieldNames.length) return null;

  return (
    <>
      {onBlurFieldNames.map((name) => (
        <OnBlurItem key={name} name={name} callback={onBlurCallback} />
      ))}
    </>
  );
};

export default OnBlurListener;
