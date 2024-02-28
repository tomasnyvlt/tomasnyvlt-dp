import { useFormApi } from "@data-driven-forms/react-form-renderer";
import styled, { x } from "@xstyled/emotion";
import { FC } from "react";

import { CheckboxFieldType } from "@src/types";

interface CheckboxesType {
  checkboxArray: CheckboxFieldType[] | undefined;
  desktopVariant?: boolean;
}

const Checkboxes: FC<CheckboxesType> = ({ checkboxArray, desktopVariant = false }) => {
  const { renderForm } = useFormApi();

  if (!checkboxArray?.length) return null;

  return (
    <x.fieldset
      position="relative"
      display={{
        _: desktopVariant ? "none" : "block",
        lg: desktopVariant ? "block" : "none"
      }}
      p={0}
      m={0}
      mt="1.5rem"
      zIndex={5}
    >
      {checkboxArray.map((checkbox) => (
        <StyledCheckboxContainer
          key={checkbox.name}
          display={{
            _: checkbox?.hideInRadioBoxContainer ? "none" : "block",
            lg: "block"
          }}
          w="100%"
          minH="3.5rem"
          border="1px solid"
          borderColor="tercial.indigo2"
          borderRadius="0.625rem"
          bg="tercial.indigo3"
          mb={{
            "&:not(:last-of-type)": "1rem"
          }}
        >
          {renderForm([checkbox])}
        </StyledCheckboxContainer>
      ))}
    </x.fieldset>
  );
};

const StyledCheckboxContainer = styled(x.div)`
  & > div {
    width: 100%;

    & > div {
      width: 100%;
    }
  }

  label {
    margin: 0;
    padding: 1rem;
    border-radius: 0.625rem;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

export default Checkboxes;
