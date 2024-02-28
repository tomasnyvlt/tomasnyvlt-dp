import { useFormApi } from "@data-driven-forms/react-form-renderer";
import { x } from "@xstyled/emotion";
import { useModal } from "anolis-ui";
import { FC, useEffect } from "react";

import { useFormStoreContext } from "@src/hooks/useFormStoreContext";

const MeetingRecordForm: FC = () => {
  const useStore = useFormStoreContext();
  const { cart, isInternalUser, isAgent } = useStore((state) => ({
    cart: state.cart,
    isInternalUser: state.isInternalUser,
    isAgent: state.isAgent
  }));

  const { renderForm } = useFormApi();
  const [close] = useModal();
  const { suitabilityRecordModal } = cart ?? {};

  useEffect(() => {
    if (isInternalUser || isAgent) return;

    window.location.hash = "modal";
    close();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInternalUser, isAgent]);

  if (!(isInternalUser || isAgent) || !suitabilityRecordModal?.schema) return null;

  return (
    <x.div
      w="100%"
      px={{
        _: "2rem",
        sm: 0
      }}
    >
      {renderForm(suitabilityRecordModal.schema)}
    </x.div>
  );
};

export default MeetingRecordForm;
