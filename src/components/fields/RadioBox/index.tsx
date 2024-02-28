import { UseFieldApiProps, useFieldApi, useFormApi } from "@data-driven-forms/react-form-renderer";
import styled, { x } from "@xstyled/emotion";
import { ChangeEvent, FC } from "react";

import Checkboxes from "@src/components/fields/RadioBox/components/Checkboxes";
import Option from "@src/components/fields/RadioBox/components/Option";
import OptionSkeleton from "@src/components/fields/RadioBox/components/OptionSkeleton";
import {
  CONTAINER_SHADOW_GAP,
  LG_GAP,
  RECOMMENDED_ADDITIONAL_SPACE
} from "@src/components/fields/RadioBox/constants";
import useScrollableRadioBox from "@src/components/fields/RadioBox/hooks/useScrollableRadioBox";
import getCheckboxArr from "@src/components/fields/RadioBox/utils/getCheckboxArr";
import { useFieldError } from "@src/hooks/useFieldError";
import {
  CheckboxFieldType,
  ClickChangeFieldType,
  RadioBoxFieldType
} from "@src/types";

type UseFieldApiType = UseFieldApiProps<any, HTMLElement> & Pick<RadioBoxFieldType, "options" | "isDataLoading">;

const RadioBox: FC<RadioBoxFieldType> = ({
  expectedOptionsLength = 3,
  expectedRecommendedOptionWithTag = false,
  theme = "primary",
  onChangeCb,
  optionCss,
  ...props
}) => {
  const { label, input, meta, options, isDataLoading = false } = useFieldApi(props) as UseFieldApiType;
  const { change } = useFormApi();
  const { scrollContainerRef, isScrolling, isOverflowing, SIDE_GAP_STYLE } = useScrollableRadioBox();
  const { isError, error } = useFieldError({ name: input.name, meta });

  const { name, value, onBlur, onChange, onFocus } = input;

  const hasRecommendedOption = options?.some((option) => option.recommended);
  const showRecommendedLg = options?.some((option) => option.recommended && !option.recommendedLgTag);
  const checkboxArr: CheckboxFieldType[] | undefined = getCheckboxArr(options);

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement>,
    changeOptions: Array<ClickChangeFieldType | null> = []
  ) => {
    // DDF onChange handler
    onChange(event);

    // onChangeCb prop - use inside setTimeout to avoid buggy browser behavior (e.g. scrolling)
    if (onChangeCb) {
      window.setTimeout(() => {
        onChangeCb();
      }, 10);
    }

    if (!changeOptions?.length) return;

    changeOptions.forEach((option) => {
      const { fieldName, value: changeOptionValue } = option || {};
      // Value can be null
      if (!fieldName) return;

      change(fieldName, changeOptionValue);
    });
  };

  return (
    <x.div>
      <x.fieldset
        p={0}
        my={0}
        mx={{
          _: `calc(${SIDE_GAP_STYLE} * -1)`,
          lg: "0"
        }}
      >
        <legend data-sr-only>{label}</legend>

        <StyledScrollContainer
          ref={scrollContainerRef}
          isScrolling={isScrolling}
          overflow={{
            _: "auto",
            lg: "unset"
          }}
          pt={{
            _:
              hasRecommendedOption || (expectedRecommendedOptionWithTag && isDataLoading)
                ? RECOMMENDED_ADDITIONAL_SPACE
                : "0",
            lg:
              (hasRecommendedOption && showRecommendedLg) || (expectedRecommendedOptionWithTag && isDataLoading)
                ? RECOMMENDED_ADDITIONAL_SPACE
                : "0"
          }}
          px={{
            _: SIDE_GAP_STYLE,
            lg: "0"
          }}
          // Fix Safari shadow overflow issue
          mb={{
            _: `-${CONTAINER_SHADOW_GAP}`,
            lg: 0
          }}
          pb={{
            _: CONTAINER_SHADOW_GAP,
            lg: 0
          }}
        >
          <StyledDropShadow
            display="flex"
            flexWrap={{
              lg: "wrap"
            }}
            justifyContent={{
              _: isOverflowing ? "flex-start" : "center",
              lg: "center"
            }}
            gap={{ lg: LG_GAP }}
            // Tap into HW acceleration to fix iOS invisible content on scroll
            transform={{
              _: "translate3d(0, 0, 0)",
              sm: "none"
            }}
            SIDE_GAP_STYLE={SIDE_GAP_STYLE}
            isOverflowing={isOverflowing}
          >
            {options?.length && !isDataLoading ? (
              options?.map((option) => (
                <Option
                  key={option.value}
                  onBlur={onBlur}
                  onChange={handleOnChange}
                  onFocus={onFocus}
                  isChecked={value === option.value}
                  name={name}
                  option={option}
                  theme={theme}
                  isError={isError}
                  optionCss={optionCss}
                />
              ))
            ) : (
              <>
                {[...Array(expectedOptionsLength)].map((_, index) => (
                  <OptionSkeleton key={`${index.toString()}`} />
                ))}
              </>
            )}
          </StyledDropShadow>
        </StyledScrollContainer>
      </x.fieldset>

      <Checkboxes checkboxArray={checkboxArr} />

      {isError && (
        <x.p
          color="tercial.red1"
          mt={{
            _: "0.75rem",
            sm: "1rem"
          }}
          fontSize="0.875rem"
        >
          {error}
        </x.p>
      )}
    </x.div>
  );
};

const StyledScrollContainer = styled(x.div, { shouldForwardProp: (prop) => prop !== "isScrolling" })<{
  isScrolling: boolean;
}>`
  /* Smooth scroll for iOS */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: lg) {
    ${({ isScrolling }) =>
      isScrolling &&
      `
      scroll-behavior: unset;
      cursor: grab;

      & > * {
        pointer-events: none;
        user-select: none;
      }
    `}
  }
`;

const StyledDropShadow = styled(x.div, {
  shouldForwardProp: (prop) => prop !== "SIDE_GAP_STYLE" && prop !== "isOverflowing"
})<{
  SIDE_GAP_STYLE: string;
  isOverflowing: boolean;
}>`
  @media (max-width: lg) {
    filter: drop-shadow(0 0.25rem 0.25rem rgba(51, 51, 51, 0.04)) drop-shadow(0 0.25rem 1rem rgba(51, 51, 51, 0.08));

    /* Additional gap on right side */
    ${({ isOverflowing, SIDE_GAP_STYLE }) =>
      isOverflowing &&
      `
      &::after {
        content: "";        
        display: flex;
        flex: 1 0 auto;
        width: ${SIDE_GAP_STYLE};
        visibility: hidden;
      }
    `}
  }
`;

export default RadioBox;
