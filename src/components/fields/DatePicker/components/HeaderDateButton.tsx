import styled, { x } from "@xstyled/emotion";
import { FC, PropsWithChildren } from "react";

interface HeaderDateButtonType {
  onClick?: () => void;
}

const HeaderDateButton: FC<PropsWithChildren<HeaderDateButtonType>> = ({ onClick, children }) => {
  return (
    <StyledContainer>
      <x.button
        as={onClick ? "button" : "span"}
        {...(onClick && {
          onClick,
          type: "button",
          cursor: "pointer",
          textDecoration: {
            "&:hover": "underline"
          }
        })}
        p="0"
        bg="transparent"
        fontSize="0.875rem"
        lineHeight="1.125rem"
        fontWeight="500"
        color="primary.black"
        outline={{
          _: "none",
          "&:focus": "none",
          "&:focus-visible": "1px auto"
        }}
        outlineColor={{
          _: "none",
          "&:focus-visible": "primary.greenDirect"
        }}
        outlineOffset="0.25rem"
      >
        {children}
      </x.button>
    </StyledContainer>
  );
};

const StyledContainer = styled(x.div)`
  /* Add empty char space between month and year */
  &:not(:first-of-type):before {
    content: " ";
    white-space: pre;
    pointer-events: none;
  }
`;

export default HeaderDateButton;
