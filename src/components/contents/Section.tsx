import { Field, useFieldApi, useFormApi } from "@data-driven-forms/react-form-renderer";
import { x } from "@xstyled/emotion";
import { FC, Fragment } from "react";

import { SectionType } from "@src/types";

const Section: FC<SectionType> = ({ fields, variant, css, ...props }) => {
  const { hideField } = useFieldApi(props);
  const { renderForm } = useFormApi();

  return (
    <x.div
      {...(variant === "withBorder" && {
        mt: { _: "2.5rem", sm: "3.5rem" },
        borderTop: "1px solid",
        borderColor: "grayscale.gray4"
      })}
      {...(variant === "withBorderMobile" && {
        mt: { _: "2.5rem", sm: "3.5rem" },
        borderTop: { _: "1px solid", sm: 0 },
        borderColor: "grayscale.gray4"
      })}
      display={hideField ? "none" : "grid"}
      {...css}
    >
      {fields.map((field, i) => (
        <Fragment key={field.component + i.toString()}>{renderForm([field as Field])}</Fragment>
      ))}
    </x.div>
  );
};

export default Section;
