import { useFieldApi } from "@data-driven-forms/react-form-renderer";
import { FC, useEffect } from "react";

import { UseFakeFieldApiConfig } from "@src/components/contents/ValidationInfo/hooks/useStepValidation";

interface FakeFieldProps {
  field: UseFakeFieldApiConfig;
  handleErrorMessageActivation: (fieldName: string, isActive: boolean) => void;
}

const FakeField: FC<FakeFieldProps> = ({ field, handleErrorMessageActivation }) => {
  const { input, meta } = useFieldApi(field);
  const { name } = input;
  const { valid } = meta;

  useEffect(() => {
    handleErrorMessageActivation(name, !valid);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, valid]);

  return null;
};

export default FakeField;
