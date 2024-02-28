import { x } from "@xstyled/emotion";
import { OptionProps, components } from "react-select";

import { OptionType } from "@src/types";

const SingleSelectOption = (props: OptionProps<OptionType>) => {
  const { children } = props;
  const label = children?.toString();

  const indexOfStartBracket = label?.indexOf("(") ?? -1;
  const indexOfLastBracket = label?.indexOf(")") ?? -1;

  const withBrackets = indexOfStartBracket !== 1 && indexOfLastBracket !== -1;

  return (
    <components.Option {...props}>
      {withBrackets ? (
        <>
          {label?.substring(0, indexOfStartBracket)}{" "}
          <x.span color="grayscale.gray2">{label?.substring(indexOfStartBracket, indexOfLastBracket + 1)}</x.span>
        </>
      ) : (
        children
      )}
    </components.Option>
  );
};

export default SingleSelectOption;
