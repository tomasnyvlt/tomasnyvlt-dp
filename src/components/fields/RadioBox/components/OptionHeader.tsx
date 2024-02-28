import styled, { x } from "@xstyled/emotion";
import { FC } from "react";

import {
  NON_HIGHLIGHTED_BTN_CSS,
  NON_HIGHLIGHTED_BTN_TEXT_CSS,
  OPTION_BORDER_RADIUS,
  OPTION_PADDING_LG
} from "@src/components/fields/RadioBox/constants";
import { RadioBoxOptionType } from "@src/types";

interface OptionHeaderProps extends Omit<RadioBoxOptionType, "recommended" | "info" | "value"> {
  isChecked: boolean;
}

const OptionHeader: FC<OptionHeaderProps> = ({
  label,
  price,
  mobileButtonText,
  checkedButtonText,
  buttonText,
  isChecked
}) => {
  const getButtonText = (isMobile: boolean = false): string => {
    if (isChecked && checkedButtonText) {
      return checkedButtonText;
    }

    if (isMobile && mobileButtonText) {
      return mobileButtonText;
    }

    return buttonText;
  };

  return (
    <x.div
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      px={{
        lg: OPTION_PADDING_LG
      }}
      pt={{
        lg: OPTION_PADDING_LG
      }}
      pb="1.5rem"
      borderRadius={{
        lg: `${OPTION_BORDER_RADIUS} ${OPTION_BORDER_RADIUS} 0 0}`
      }}
      minH="9.75rem"
    >
      <x.div
        fontSize={{
          _: "0.75rem",
          lg: "0.875rem"
        }}
        fontWeight={500}
        lineHeight={{
          _: "1rem",
          lg: "1.125rem"
        }}
        mb={{
          _: "1rem",
          lg: "2rem"
        }}
        whiteSpace={{
          lg: "pre-line"
        }}
      >
        {label}
      </x.div>

      <x.div>
        <x.div
          color={price?.variant === "small" ? "grayscale.gray1Alpha50" : "primary.black"}
          fontSize={{
            _: price?.variant === "small" ? "0.625rem" : "1rem",
            lg: price?.variant === "small" ? "0.875rem" : "1.325rem"
          }}
          lineHeight={{
            _: price?.variant === "small" ? "0.875rem" : "1.25rem",
            lg: price?.variant === "small" ? "1.375rem" : "1.625rem"
          }}
          fontWeight={500}
          mt="auto"
          mb="0.75rem"
        >
          {price.text}
        </x.div>

        <StyledFakeButton
          position="relative"
          color="primary.white"
          background="linear-gradient(77.45deg, #5A53E1 0%, #CC7EFF 69.65%, #C098F2 100%)"
          py="0.75rem"
          px="1rem"
          fontSize="0.875rem"
          fontWeight={500}
          lineHeight="1.125rem"
          borderRadius="12.5rem"
          textAlign="center"
          isChecked={isChecked}
        >
          <StyledFakeButtonText isChecked={isChecked}>
            <x.span display={{ _: mobileButtonText ? "inline" : "none", lg: "none" }}>{getButtonText(true)}</x.span>

            <x.span display={{ _: mobileButtonText ? "none" : "inline", lg: "inline" }}>{getButtonText()}</x.span>
          </StyledFakeButtonText>
        </StyledFakeButton>
      </x.div>
    </x.div>
  );
};

const StyledFakeButton = styled(x.div, { shouldForwardProp: (prop) => prop !== "isChecked" })<{
  isChecked: boolean;
}>`
  @media (max-width: lg) {
    ${({ isChecked }) => !isChecked && `${NON_HIGHLIGHTED_BTN_CSS}`}
  }

  @media (min-width: lg) {
    [data-group]:not(:hover) & {
      ${({ isChecked }) => !isChecked && `${NON_HIGHLIGHTED_BTN_CSS}`}
    }
  }
`;

const StyledFakeButtonText = styled(x.span, { shouldForwardProp: (prop) => prop !== "isChecked" })<{
  isChecked: boolean;
}>`
  @media (max-width: lg) {
    ${({ isChecked }) => !isChecked && `${NON_HIGHLIGHTED_BTN_TEXT_CSS}`}
  }

  @media (min-width: lg) {
    [data-group]:not(:hover) & {
      ${({ isChecked }) => !isChecked && `${NON_HIGHLIGHTED_BTN_TEXT_CSS}`}
    }
  }
`;

export default OptionHeader;
