import { MultiValueGenericProps, components } from "react-select";

import { OptionType } from "@src/types";

const MultiValueLabel = (props: MultiValueGenericProps<OptionType>) => {
  const { value } = props.selectProps;

  const composedLabel = (value as OptionType[])?.map(({ label }) => label).join(", ");

  return <components.MultiValueLabel {...props}>{composedLabel}</components.MultiValueLabel>;
};

export default MultiValueLabel;
