import { x } from "@xstyled/emotion";
import { FC } from "react";

import OptionInfoItem from "@src/components/fields/RadioBox/components/OptionInfoItem";
import {
  OPTION_BORDER_RADIUS,
  OPTION_BOX_SHADOW,
  OPTION_PADDING_LG
} from "@src/components/fields/RadioBox/constants";
import { RadioBoxOptionType } from "@src/types";

const OptionInfo: FC<Pick<RadioBoxOptionType, "info">> = ({ info }) => {
  return (
    <x.div
      flex="1"
      minH="16rem"
      px={{
        lg: OPTION_PADDING_LG
      }}
      pb={{
        lg: OPTION_PADDING_LG
      }}
      borderRadius={{
        lg: OPTION_BORDER_RADIUS
      }}
      boxShadow={{
        lg: OPTION_BOX_SHADOW
      }}
    >
      {info?.map((item, index) => (
        <x.div
          key={`${index.toString()}`}
          borderTop={{
            _: "1px solid",
            lg: {
              "&:first-of-type": 0
            }
          }}
          borderColor="grayscale.gray3"
          py="1rem"
          pb={{ "&:last-of-type": 0 }}
        >
          <OptionInfoItem key={`${index.toString()}`} item={item} />
        </x.div>
      ))}
    </x.div>
  );
};

export default OptionInfo;
