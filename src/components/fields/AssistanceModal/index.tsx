import { UseFieldApiProps, useFieldApi, useFormApi } from "@data-driven-forms/react-form-renderer";
import { Modal } from "anolis-ui";
import { FC } from "react";

import AssistanceModalContent from "@src/components/fields/AssistanceModal/components/AssistanceModalContent";
import { AssistanceModalType, RadioBoxFieldType } from "@src/types/formFields";

type UseFieldApiType = UseFieldApiProps<any, HTMLElement> &
  Pick<AssistanceModalType, "options" | "isOpen" | "editFields" | "label">;

const AssistanceModal: FC<AssistanceModalType> = ({ ...props }) => {
  const { input, isOpen, editFields, options, label, otherFields } = useFieldApi(props) as UseFieldApiType;
  const { name } = input;
  const { change } = useFormApi();

  const radioBoxFieldComponent: RadioBoxFieldType = {
    component: "radio-box",
    name,
    label,
    options,
    theme: "tercial",
    expectedOptionsLength: 3
  };

  const closeModal = (): void => {
    editFields?.forEach((editField: string) => change(editField, false));
  };

  if (!isOpen) return null;

  return (
    <Modal p={0} w="100%" maxW={{ _: "100%", lg: "54.375rem" }} bg="transparent">
      <AssistanceModalContent
        closeModal={closeModal}
        radioBoxFieldComponent={radioBoxFieldComponent}
        otherFields={otherFields}
      />
    </Modal>
  );
};

export default AssistanceModal;
