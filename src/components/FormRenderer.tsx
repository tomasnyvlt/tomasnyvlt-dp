import { ValidatorMapper } from '@data-driven-forms/react-form-renderer';
import { FormRenderer as DataDrivenFormRenderer } from '@data-driven-forms/react-form-renderer';
import { FC, Fragment, useMemo } from 'react';

import componentMapper from '@src/components/componentMapper';
import SmartformScript from '@src/components/fields/SmartformScript';
import FormTemplate from '@src/components/FormTemplate';
import validatorMapper from '@src/components/validatorMapper';
import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import { FormFieldsType, SchemaType } from '@src/types';
import { logger } from '@src/utils/logger';

interface FormRendererProps {
  schema: SchemaType;
}

const FormRenderer: FC<FormRendererProps> = ({ schema }) => {
  const useStore = useFormStoreContext();
  const { flattenFields, formKey } = useStore((state) => ({
    flattenFields: state.flattenFields,
    formKey: state.formKey,
  }));

  const hasSmartformField: boolean = useMemo(() => {
    return !!(flattenFields as FormFieldsType[]).find(
      (field) => field.component === 'smartform-field'
    );
  }, [flattenFields]);

  return (
    <div>
      <Fragment key={formKey}>
        <DataDrivenFormRenderer
          schema={schema}
          componentMapper={componentMapper}
          validatorMapper={validatorMapper as ValidatorMapper}
          FormTemplate={FormTemplate}
          onSubmit={(values) => logger(values)}
        />
      </Fragment>

      {/* TODO MS add isScriptLoaded state cb and add it to condition -> hasSmartformField || isScriptLoaded  */}
      {hasSmartformField && <SmartformScript />}
    </div>
  );
};

export default FormRenderer;
