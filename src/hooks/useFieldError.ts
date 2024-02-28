import { Meta } from "@data-driven-forms/react-form-renderer";

import { useFormStoreContext } from "@src/hooks/useFormStoreContext";

interface Props {
  name: string;
  meta: Meta<any>;
}

interface Output {
  isError: boolean;
  error?: string;
}

const useFieldError = ({ name, meta }: Props): Output => {
  const useStore = useFormStoreContext();

  const restError: string | null = useStore((state) => state.restValidation.errors?.[name]);

  const isError = !!restError || !!(meta.touched && meta.error !== undefined);
  const error = meta.error ?? restError;

  return {
    isError,
    error
  };
};

export { useFieldError };
