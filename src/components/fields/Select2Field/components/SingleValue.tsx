import { x } from "@xstyled/emotion";
import { SingleValueProps, components } from "react-select";

import { OptionType } from "@src/types";

const SingleValue = (props: SingleValueProps<OptionType>) => {
  const { children } = props;

  const indexOfStartBracket = children?.toString().indexOf("(") ?? -1;
  const indexOfLastBracket = children?.toString().indexOf(")") ?? -1;

  const withBrackets = indexOfStartBracket !== 1 && indexOfLastBracket !== -1;

  return (
    <components.SingleValue {...props}>
      {withBrackets ? (
        <>
          {children?.toString().substring(0, indexOfStartBracket)}{" "}
          <x.span color="grayscale.gray2">
            {children?.toString().substring(indexOfStartBracket, indexOfLastBracket + 1)}
          </x.span>
        </>
      ) : (
        children
      )}
    </components.SingleValue>
  );
};

export default SingleValue;
