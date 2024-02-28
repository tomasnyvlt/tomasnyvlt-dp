import { x } from "@xstyled/emotion";
import { FC } from "react";

import OptionInfoModalLink from "@src/components/fields/RadioBox/components/OptionInfoModalLink";
import { RadioBoxInfoTextType } from "@src/types";

interface OptionInfoContentHeadingProps {
  data: RadioBoxInfoTextType;
}

const OptionInfoContentHeading: FC<OptionInfoContentHeadingProps> = ({ data }) => {
  return (
    <x.div
      color="primary.black50"
      mb={{
        "&:not(:last-of-type)": {
          _: "1.25rem",
          lg: "1rem"
        }
      }}
      whiteSpace={{
        _: "pre-line",
        lg: "normal"
      }}
    >
      {typeof data === "string" ? data : <OptionInfoModalLink {...data} />}
    </x.div>
  );
};

export default OptionInfoContentHeading;
