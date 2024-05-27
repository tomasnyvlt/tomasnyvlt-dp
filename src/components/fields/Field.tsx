import { x } from '@xstyled/emotion';
import { SystemProps } from '@xstyled/system';
import {
  ElementType,
  FC,
  LabelHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from 'react';

import AnimatedContent from '@src/components/contents/AnimatedContent';
import Richtext from '@src/components/other/Richtext';

interface FieldProps
  extends SystemProps,
    Omit<LabelHTMLAttributes<HTMLLabelElement>, 'color'> {
  fieldActive?: boolean;
  label?: ReactNode;
  helper?: ReactNode;
  errorText?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  as?: ElementType;
  helperCss?: SystemProps;
  hideField?: boolean;
  isSelectField?: boolean;
  fieldName?: string;
}

const Field: FC<PropsWithChildren<FieldProps>> = ({
  fieldActive,
  label,
  helper,
  isRequired,
  isDisabled,
  isError,
  errorText,
  children,
  cursor = 'pointer',
  helperCss,
  hideField,
  isSelectField,
  fieldName,
  ...props
}) => {
  return (
    <AnimatedContent isOpen={!hideField}>
      <x.div flexDirection="column">
        <x.label
          display="block"
          position="relative"
          outline="none"
          cursor={isDisabled ? 'not-allowed' : cursor}
          {...props}
        >
          <x.span
            position="absolute"
            fontWeight={fieldActive ? 400 : 500}
            fontSize={
              fieldActive
                ? '0.625rem'
                : { _: '0.9rem', md: '0.9rem', lg: '1rem' }
            }
            lineHeight={fieldActive ? '0.875rem' : '1.25rem'}
            left="1rem"
            top={fieldActive ? '0.6875rem' : '1.125rem'}
            transition="font-weight 300ms, font-size 300ms, line-height 300ms, top 300ms"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            // Fix overlapping with select arrow
            maxW={`calc(100% - ${isSelectField ? '3.5rem' : '2rem'})`}
            pointerEvents="none"
            zIndex={1}
            {...(isError && { color: 'tercial.red1' })}
            {...(isDisabled && { color: 'grayscale.gray2' })}
          >
            {label && (
              <>
                {label}
                {isRequired && <x.span>*</x.span>}
              </>
            )}
          </x.span>

          {children}
        </x.label>

        {isError && (
          <x.p color="tercial.red1" mt="0.25rem" fontSize="0.875rem">
            {errorText}
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
              gtmActionPrefix={`sjednavac_richtext_${fieldName}`}
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
                  ...helperCss,
                },
              }}
            />
          </x.div>
        )}
      </x.div>
    </AnimatedContent>
  );
};

export default Field;
