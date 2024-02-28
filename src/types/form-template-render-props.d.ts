declare module "@data-driven-forms/react-form-renderer/common-types/form-template-render-props" {
  import { ElementType } from "react";
  import { FormTemplateRenderProps as DefaultFormTemplateRenderProps } from "@data-driven-forms/react-form-renderer";

  type DefaultSchema = DefaultFormTemplateRenderProps["schema"];

  export interface FormTemplateRenderProps extends DefaultFormTemplateRenderProps {
    schema: DefaultSchema & {
      onSubmit?: (formOptions: FormOptions, fetcherData: FetcherResponseType<FormFetcherType>) => void;
    };
  }

  export default FormTemplateRenderProps;
}
