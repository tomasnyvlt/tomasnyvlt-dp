import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { x } from '@xstyled/emotion';
import { FC } from 'react';

import RadioFrequencyButton from '@src/components/contents/RadioFrequency/RadioFrequencyButton';
import { useFieldError } from '@src/hooks/useFieldError';
import {
  RadioContainerFieldType,
  RadioFrequencyButtonOptionFieldType,
} from '@src/types';
import Skeleton from '@src/components/other/Skeleton';

const RadioContainer: FC<RadioContainerFieldType> = ({
  expectedOptionsLength = 3,
  withBorder,
  css,
  buttonCss,
  innerCss,
  ...props
}) => {
  const { input, meta, options } = useFieldApi(props);
  const { isError, error } = useFieldError({ name: input.name, meta });

  const { name, onBlur, onChange, onFocus } = input;

  return (
    <x.div
      display="flex"
      justifyContent="center"
      alignItems="center"
      minWidth="100%"
    >
      <x.fieldset {...css}>
        <x.div
          pt={{ _: '1.5rem', sm: 0 }}
          pb="0.5rem"
          flexDirection={{ _: 'column', lg: 'row' }}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          borderRadius="1.25rem"
          border={withBorder ? '1px solid' : { _: '1px solid', sm: 0 }}
          gap="1.5rem"
          borderColor="grayscale.gray4"
          {...innerCss}
        >
          {options?.length ? (
            options.map((option: RadioFrequencyButtonOptionFieldType) => (
              <RadioFrequencyButton
                key={option.value}
                buttonCss={buttonCss}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
                isChecked={input.value === option.value}
                name={name}
                option={option}
              />
            ))
          ) : (
            <>
              {[...Array(expectedOptionsLength)].map((_, index) => (
                <Skeleton
                  key={`${index.toString()}`}
                  skeletonProps={{ height: 96, width: 250, borderRadius: 20 }}
                />
              ))}
            </>
          )}
        </x.div>
        {isError && (
          <x.p color="tercial.red1" mt="0.25rem" fontSize="0.875rem">
            {error}
          </x.p>
        )}
      </x.fieldset>
    </x.div>
  );
};

export default RadioContainer;
