import {
  UseFieldApiProps,
  useFieldApi,
} from '@data-driven-forms/react-form-renderer';
import { x } from '@xstyled/emotion';
import { FC } from 'react';

import { useFieldError } from '@src/hooks/useFieldError';
import { ToggleFieldType } from '@src/types';
import Richtext from '@src/components/other/Richtext';

type UseFieldApiType = UseFieldApiProps<any, HTMLElement> &
  Pick<ToggleFieldType, 'options' | 'helper' | 'hideField'>;

const ToggleField: FC<ToggleFieldType> = ({ css, legend, ...props }) => {
  const { input, meta, options, helper, hideField } = useFieldApi(
    props
  ) as UseFieldApiType;
  const { isError, error } = useFieldError({ name: input.name, meta });

  const { onBlur, onChange, onFocus } = input;

  const getIndexOfActiveOption = (): number => {
    return options.findIndex(
      (option) => Number(option.value) === Number(input.value)
    );
  };

  return (
    <x.div
      display={hideField ? 'none' : 'flex'}
      justifyContent="center"
      alignItems="center"
      minWidth="100%"
    >
      <x.fieldset p={0} m={0} w="100%" {...css}>
        {legend && (
          <x.legend
            fontSize="0.875rem"
            lineHeight="1.125rem"
            fontWeight="500"
            color="primary.black"
          >
            {legend}
          </x.legend>
        )}

        <x.div
          display="flex"
          flexWrap="wrap"
          mt={legend ? '1rem' : 0}
          w="100%"
          position="relative"
        >
          <x.div
            position="absolute"
            bg="primary.greenDirect10"
            w={`calc(100% / ${options.length})`}
            h="100%"
            borderRadius={
              getIndexOfActiveOption() === 0
                ? '0.75rem 0 0 0.75rem'
                : getIndexOfActiveOption() === options.length - 1
                  ? '0 0.75rem 0.75rem 0'
                  : '0'
            }
            border="1px solid"
            borderColor="primary.greenDirect"
            left={`calc(100% / ${options.length} * ${getIndexOfActiveOption()})`}
            transition="left 300ms, border-radius 300ms"
          />

          {options.map((option, index: number) => (
            <x.div
              key={option.value}
              w={`calc(100% / ${options.length})`}
              display="flex"
              borderRadius={
                index === 0
                  ? '0.75rem 0 0 0.75rem'
                  : index === options.length - 1
                    ? '0 0.75rem 0.75rem 0'
                    : '0'
              }
              border="1px solid"
              borderRight={
                index === 0
                  ? 0
                  : index === options.length - 1
                    ? '1px solid'
                    : '1px solid'
              }
              borderLeft={
                index === 0
                  ? '1px solid'
                  : index === options.length - 1
                    ? '0'
                    : '1px solid'
              }
              borderColor="grayscale.gray4"
              overflow="hidden"
            >
              <x.input
                type="radio"
                id={`${input.name}-${option.value}`}
                name={input.name}
                value={option.value}
                checked={Number(input.value) === Number(option.value)}
                display="none"
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
              />

              <x.label
                htmlFor={`${input.name}-${option.value}`}
                w="100%"
                py="1.0625rem"
                position="relative"
                textAlign="center"
                zIndex="2"
                fontSize="1rem"
                lineHeight="1.25rem"
                fontWeight={500}
                cursor="pointer"
              >
                {option.label}
              </x.label>
            </x.div>
          ))}
        </x.div>

        {isError && (
          <x.p color="tercial.red1" mt="0.25rem" fontSize="0.875rem">
            {error}
          </x.p>
        )}

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
                  borderColor: {
                    _: 'grayscale.grayWarm',
                    hover: 'transparent',
                  },
                },
              }}
            />
          </x.div>
        )}
      </x.fieldset>
    </x.div>
  );
};

export default ToggleField;
