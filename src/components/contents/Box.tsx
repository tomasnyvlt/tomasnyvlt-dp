import { Field, useFieldApi, useFormApi } from "@data-driven-forms/react-form-renderer";
import { x } from "@xstyled/emotion";
import { FC, Fragment } from "react";

import { BoxType } from "@src/types";

const Box: FC<BoxType> = ({ fields, css, ...props }) => {
  const { hideField, resolvedFields } = useFieldApi(props);
  const { renderForm } = useFormApi();

  const contentFields = resolvedFields ?? fields;

  return (
    <x.div {...css} {...(hideField && { display: "none" })}>
      {(contentFields as typeof fields)?.map((field, i) => (
        <Fragment key={field.component + i.toString()}>{renderForm([field as Field])}</Fragment>
      ))}
    </x.div>
  );
};

export default Box;
