import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { x } from '@xstyled/emotion';
import { FC } from 'react';

import RadioSelectField from '@src/components/fields/RadioSelect/RadioSelectField';
import { useFieldError } from '@src/hooks/useFieldError';
import {
  RadioSelectContainerFieldType,
  RadioSelectFieldOptionType,
} from '@src/types';
import Skeleton from '@src/components/other/Skeleton';

const RadioSelectContainer: FC<RadioSelectContainerFieldType> = ({
  css,
  ...props
}) => {
  const { input, meta, options } = useFieldApi(props);
  const { isError, error } = useFieldError({ name: input.name, meta });

  const { name, onBlur, onChange, onFocus } = input;

  return (
    <x.div
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      px="1.5rem"
    >
      <x.fieldset w="100%" p="0" {...css}>
        {options?.length ? (
          options.map((option: RadioSelectFieldOptionType) => (
            <RadioSelectField
              key={option.value}
              onBlur={onBlur}
              onChange={onChange}
              onFocus={onFocus}
              isChecked={input.value === option.value}
              name={name}
              option={option}
            />
          ))
        ) : (
          <x.div
            display="flex"
            flexDirection="column"
            gap="0.5rem"
            w="100%"
            py="1rem"
            alignItems="center"
          >
            <Skeleton
              skeletonProps={{ height: 140, width: 280, borderRadius: 20 }}
            />
          </x.div>
        )}

        {isError && (
          <x.p color="tercial.red1" mt="0.25rem" fontSize="0.875rem">
            {error}
          </x.p>
        )}
      </x.fieldset>
    </x.div>
  );
};

export default RadioSelectContainer;
