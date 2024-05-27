import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { x } from '@xstyled/emotion';
import { Input } from 'anolis-ui';
import { FC, FormEvent } from 'react';

import Field from '@src/components/fields/Field';
import { useFieldError } from '@src/hooks/useFieldError';
import { FileUploadType } from '@src/types';
//import DpUploadFiles from '@src/components/contents/forms/shared/upload-files/DpUploadFiles';
import Richtext from '@src/components/other/Richtext';

const FileUpload: FC<FileUploadType> = ({
  helperCss,
  documentType = 'OTHER',
  ...props
}) => {
  const { input, isRequired, meta, isDisabled, helper } = useFieldApi(props);
  const fieldActive = meta.active || input.value;
  const { isError, error } = useFieldError({ name: input.name, meta });

  const handleInputOnChange = (event: FormEvent<HTMLInputElement>) => {
    input.onChange(event);
  };

  //const handleFileUpload = (uploadIds: string[]) => {
  //input.onChange(uploadIds?.join(','));
  //};

  return (
    <>
      <Field
        fieldActive={fieldActive}
        isRequired={isRequired}
        isDisabled={isDisabled || meta.submitting}
        isError={isError}
        errorText={error}
        cursor="text"
        hideField
        fieldName={input.name}
      >
        <Input
          {...props.inputProps}
          disabled={isDisabled || meta.submitting}
          opacity={isDisabled || meta.submitting ? 0.5 : 1}
          cursor="inherit"
          required={isRequired}
          {...(isError && { borderColor: 'tercial.red1' })}
          _input={{
            ...input,
            disabled: isDisabled || meta.submitting,
            ...props.inputProps?._input,
            onFocus: input.onFocus,
            onBlur: input.onBlur,
            onChange: handleInputOnChange,
          }}
        />
      </Field>

      {/*
      <DpUploadFiles
        handleFileUpload={handleFileUpload}
        documentType={documentType}
      />
      */}

      {helper && (
        <x.div
          mt="0.5rem"
          fontSize="0.625rem"
          lineHeight="0.875rem"
          color="grayscale.grayWarm"
        >
          <Richtext
            data={helper as string}
            styles={{
              _p: {
                fontFamily: 'text-sans',
                fontSize: '0.625rem',
                lineHeight: '0.875rem',
                color: 'grayscale.grayWarm',
                fontWeight: 400,
              },
              _a: {
                fontSize: 'inherit',
                color: 'grayscale.grayWarm',
                borderColor: { _: 'grayscale.grayWarm', hover: 'transparent' },
                ...helperCss,
              },
            }}
          />
        </x.div>
      )}
      {isError && <x.p color="tercial.red1">{error}</x.p>}
    </>
  );
};

export default FileUpload;
