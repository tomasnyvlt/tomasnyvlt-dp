import { useFormApi } from "@data-driven-forms/react-form-renderer";
import { FC } from "react";

import { useFormStoreContext } from "@src/hooks/useFormStoreContext";

const OwnTemplateCheckbox: FC = () => {
  const useStore = useFormStoreContext();
  const { cart, isAgent } = useStore((state) => ({
    cart: state.cart,
    isAgent: state.isAgent
  }));
  const { renderForm } = useFormApi();

  const { suitabilityRecordModal } = cart ?? {};

  if (!isAgent || !suitabilityRecordModal?.ownTemplateSchema) return null;

  return <>{renderForm(suitabilityRecordModal.ownTemplateSchema)}</>;
};

export default OwnTemplateCheckbox;
