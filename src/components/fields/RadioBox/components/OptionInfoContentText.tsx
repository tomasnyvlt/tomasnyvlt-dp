import { x } from "@xstyled/emotion";
import { FC } from "react";

import OptionInfoModalLink from "@src/components/fields/RadioBox/components/OptionInfoModalLink";
import { RadioBoxInfoTextType } from "@src/types";

interface OptionInfoContentTextProps {
  data: RadioBoxInfoTextType;
}

const OptionInfoContentText: FC<OptionInfoContentTextProps> = ({ data }) => {
  const isString = typeof data === "string";

  return (
    <x.div
      color={isString ? "primary.black" : "grayscale.gray1"}
      fontSize={isString ? "inherit" : "0.625rem"}
      fontWeight={isString ? 500 : 400}
      lineHeight={isString ? "inherit" : "0.875rem"}
      marginTop={{
        "&:not(:first-of-type)": isString ? "0" : "1rem"
      }}
      whiteSpace="pre-line"
    >
      {isString ? data : <OptionInfoModalLink {...data} />}
    </x.div>
  );
};

export default OptionInfoContentText;
