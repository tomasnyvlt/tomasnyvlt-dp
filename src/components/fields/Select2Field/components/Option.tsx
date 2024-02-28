import { OptionProps } from "react-select";

import MultiSelectOption from "@src/components/fields/Select2Field/components/MultiSelectOption";
import SingleSelectOption from "@src/components/fields/Select2Field/components/SingleSelectOption";
import { OptionType } from "@src/types";

const Option = (props: OptionProps<OptionType>) => {
  if (props.isMulti) {
    return <MultiSelectOption {...props} />;
  }

  return <SingleSelectOption {...props} />;
};

export default Option;
