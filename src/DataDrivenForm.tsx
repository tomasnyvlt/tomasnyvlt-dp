import { FC, memo } from 'react';

import FormRenderer from '@src/components/FormRenderer';
import FormStoreContextProvider from '@src/context/FormStoreContext';
import { SchemaType } from '@src/types';

interface DataDrivenFormProps {
  schema: SchemaType;
}

export const DataDrivenForm: FC<DataDrivenFormProps> = memo(({ schema }) => {
  return (
    <FormStoreContextProvider schema={schema}>
      <FormRenderer schema={schema} />
    </FormStoreContextProvider>
  );
});
