import { FC, memo } from "react";

import FormRenderer from "@src/components/FormRenderer";
import FormStoreContextProvider from "@src/context/FormStoreContext";
import { SchemaType } from "@src/types";

interface DataDrivenFormProps {
  schema: SchemaType;
}

const DataDrivenForm: FC<DataDrivenFormProps> = ({ schema }) => {
  return (
    <FormStoreContextProvider schema={schema}>
      <FormRenderer schema={schema} />
    </FormStoreContextProvider>
  );
};

export default memo(DataDrivenForm);
