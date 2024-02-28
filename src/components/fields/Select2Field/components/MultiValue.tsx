import { MultiValueProps, components } from "react-select";

import { OptionType } from "@src/types";

const MultiValue = (props: MultiValueProps<OptionType>) => {
  const { children, data, selectProps } = props;
  const [firstSelectedOption] = (selectProps.value || []) as OptionType[];

  const optionValue = data.value;
  const firstSelectedOptionValue = firstSelectedOption?.value || firstSelectedOption;

  /**
   * Render only first selected option,
   * all selected value labels are concated in MultiValueLabel
   */
  if (optionValue !== firstSelectedOptionValue) {
    return null;
  }

  return <components.MultiValue {...props}>{children}</components.MultiValue>;
};

export default MultiValue;
