import { Field, useFieldApi, useFormApi } from "@data-driven-forms/react-form-renderer";
import { x } from "@xstyled/emotion";
import { FC, Fragment } from "react";

import { GridType } from "@src/types";

const Grid: FC<GridType> = ({ fields, bottomFields, ...props }) => {
  const { hideField, css, fieldsToRender, defaultFieldsToRender } = useFieldApi(props);
  const { renderForm, getRegisteredFields } = useFormApi();

  const filteredArray = fields.filter((field) =>
    getRegisteredFields().some((filterString) => field.name.includes(filterString))
  );

  return (
    <x.div
      display={hideField ? "none" : "grid"}
      gap={{ _: "1.5rem", sm: "2rem 1.5rem" }}
      gridTemplateColumns={{ _: "1", sm: "repeat(2, 1fr)" }}
      mt={{ _: "1.5rem", sm: "2rem" }}
      {...css}
    >
      {fieldsToRender ? (
        <>
          {/* FAKE RENDER TO DO SOME MAGIC AND FILTER ONLY ITEMS THAT ARE VISIBLE */}
          <x.div display="none">
            {fields.map((field, i) => (
              <Fragment key={field.component + i.toString()}>{renderForm([field as Field])}</Fragment>
            ))}
          </x.div>
          {filteredArray.map((field, i) => (
            <x.div key={field.component + i.toString()} display={i < fieldsToRender ? "block" : "none"}>
              {renderForm([field as Field])}
            </x.div>
          ))}
        </>
      ) : (
        fields.map((field, i) => (
          <Fragment key={field.component + i.toString()}>{renderForm([field as Field])}</Fragment>
        ))
      )}

      {filteredArray.length > defaultFieldsToRender &&
        bottomFields?.map((field, i) => (
          <x.div
            display={fields.length >= fieldsToRender ? "block" : "none"}
            key={field.component + i.toString() + i.toString()}
            gridColumn={{ _: "1", sm: "span 2" }}
          >
            {renderForm([field as Field])}
          </x.div>
        ))}
    </x.div>
  );
};

export default Grid;
