import {
  UseFieldApiProps,
  useFieldApi,
} from '@data-driven-forms/react-form-renderer';
import styled, { th, x } from '@xstyled/emotion';
import { FC, useId, useRef } from 'react';

import {
  INPUT_BORDER_RADIUS,
  INPUT_THUMB_HEIGHT,
  INPUT_THUMB_WIDTH,
  INPUT_TRACK_HEIGHT,
} from '@src/components/fields/RangeField/constants';
import { useFieldError } from '@src/hooks/useFieldError';
import { RangeFieldType } from '@src/types';
import Richtext from '@src/components/other/Richtext';

type UseFieldApiType = UseFieldApiProps<any, HTMLElement> &
  Pick<
    RangeFieldType,
    'min' | 'max' | 'step' | 'helper' | 'label' | 'isRequired'
  >;

const RangeField: FC<RangeFieldType> = ({ css, helperCss, ...props }) => {
  const {
    input,
    meta,
    label,
    helper,
    isRequired = false,
    min = 0,
    max = 100,
    step = 1,
  } = useFieldApi(props) as UseFieldApiType;

  const { isError, error } = useFieldError({ name: input.name, meta });

  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const activeTrackWidthPercentage = `${(input.value / max) * 100}%`;

  return (
    <x.fieldset p={0} m={0} {...css}>
      {label && (
        <x.label
          htmlFor={inputId}
          display="block"
          color="tercial.indigo1Alpha50"
          cursor="pointer"
          mb="1.75rem"
          fontSize="0.75rem"
          lineHeight="1rem"
          w="fit-content"
        >
          {label}
          {isRequired && <span>*</span>}
        </x.label>
      )}

      <StyledInputWrapper
        position="relative"
        h={INPUT_TRACK_HEIGHT}
        activeWidth={activeTrackWidthPercentage}
      >
        <StyledRangeInput
          ref={inputRef}
          type="range"
          id={inputId}
          name={input.name}
          value={input.value}
          min={min}
          max={max}
          step={step}
          onChange={input.onChange}
          onFocus={input.onFocus}
          onBlur={input.onBlur}
          onMouseUp={() => {
            inputRef.current?.blur();
          }}
          onTouchEnd={() => {
            inputRef.current?.blur();
          }}
          disabled={meta.submitting}
          required={isRequired}
          // Styles
          activeWidth={activeTrackWidthPercentage}
          display="block"
          w="100%"
          appearance="none"
          bg="transparent"
          cursor="pointer"
          outline="none"
          {...css}
        />

        <x.output
          htmlFor={inputId}
          position="absolute"
          top="50%"
          left={`calc(${activeTrackWidthPercentage} - ${INPUT_THUMB_WIDTH} / 2)`}
          transform={`translateY(-50%) translateX(calc((${activeTrackWidthPercentage} * -1) + ${INPUT_THUMB_WIDTH} / 2))`}
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="tercial.indigo2"
          fontSize="0.75rem"
          fontWeight="500"
          lineHeight="1rem"
          backgroundColor="primary.white"
          border="1px solid"
          borderColor="grayscale.gray4"
          borderRadius="1.25rem"
          boxShadow="inputRangeThumb"
          h={INPUT_THUMB_HEIGHT}
          w={INPUT_THUMB_WIDTH}
          zIndex="-1"
        >
          {`${input.value}%`}
        </x.output>
      </StyledInputWrapper>

      <x.div
        display="flex"
        justifyContent="space-between"
        color="tercial.indigo2"
        fontSize="0.75rem"
        fontWeight="500"
        lineHeight="1rem"
        mt="1rem"
      >
        <x.div>{`${min}%`}</x.div>
        <x.div>{`${max}%`}</x.div>
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
            data={helper}
            gtmActionPrefix={`sjednavac_richtext_${input.name}`}
            styles={{
              _p: {
                fontFamily: 'text-sans',
                fontSize: 'inherit',
                lineHeight: 'inherit',
                color: 'inherit',
                fontWeight: 400,
              },
              _a: {
                fontSize: 'inherit',
                color: 'inherit',
                borderColor: { _: 'inherit', hover: 'transparent' },
                ...helperCss,
              },
            }}
          />
        </x.div>
      )}
    </x.fieldset>
  );
};

const StyledInputWrapper = styled(x.div, {
  shouldForwardProp: (prop) => prop !== 'activeWidth',
})<{
  activeWidth: string;
}>`
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: ${INPUT_BORDER_RADIUS};
    max-width: 100%;
  }

  ${({ activeWidth }) =>
    activeWidth &&
    `
      &::before {
        background-color: tercial.indigo2;
        left: 0;
        width: ${activeWidth};
        z-index: -2;
      }

      &::after {
        background-color: tercial.indigo2Alpha20;
        right: 0;
        width: calc(100% - ${activeWidth});
        z-index: -3;
      }
  `}
`;

// Remove `activeWidth` prop from the DOM to prevent React warning
const StyledRangeInput = styled(x.input, {
  shouldForwardProp: (prop) => prop !== 'activeWidth',
})<{
  activeWidth: string;
}>`
  &:focus-visible ~ output {
    border: 1px solid ${th.color('tercial.indigo2')};
    outline: 3px solid ${th.color('tercial.indigo2')};
    outline-offset: 0.125rem;
  }

  /***** Chrome, Safari, Opera and Edge Chromium styles *****/

  /* Slider track */
  &::-webkit-slider-runnable-track {
    background-color: transparent;
    border-radius: ${INPUT_BORDER_RADIUS};
    height: ${INPUT_TRACK_HEIGHT};
  }

  /* Slider thumb */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 1.25rem;
    height: ${INPUT_THUMB_HEIGHT};
    width: ${INPUT_THUMB_WIDTH};
    /* Centers thumb on the track */
    margin-top: calc(
      (${INPUT_THUMB_HEIGHT} / -2) + (${INPUT_TRACK_HEIGHT} / 2)
    );
  }

  &:focus::-webkit-slider-thumb {
    border: 0;
    outline: 0;
  }

  /******** Firefox styles ********/

  /* Slider track */
  &::-moz-range-track {
    background-color: transparent;
    border-radius: ${INPUT_BORDER_RADIUS};
    height: ${INPUT_TRACK_HEIGHT};
  }

  /* Slider thumb */
  &::-moz-range-thumb {
    /* Removes extra styles FF applies */
    border: none;
    border-radius: 0;

    /* Custom styles */
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 1.25rem;
    height: ${INPUT_THUMB_HEIGHT};
    width: ${INPUT_THUMB_WIDTH};
  }

  &:focus::-moz-range-thumb {
    border: 0;
    outline: 0;
  }
`;

export default RangeField;
