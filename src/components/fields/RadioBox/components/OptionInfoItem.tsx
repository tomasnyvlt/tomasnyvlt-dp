import { x } from "@xstyled/emotion";
import { FC } from "react";

import OptionInfoContent from "@src/components/fields/RadioBox/components/OptionInfoContent";
import { RadioBoxInfoType } from "@src/types";

interface OptionInfoItemType {
  item: RadioBoxInfoType[];
}

const OptionInfoItem: FC<OptionInfoItemType> = ({ item }) => {
  return (
    <>
      {item.map((infoItem, infoIndex) => {
        if (!Object.keys(infoItem)?.length) return null;

        return (
          <x.div
            key={`${infoIndex.toString()}`}
            display={{
              _: infoItem?.checkboxField ? "none" : "block",
              lg: "block"
            }}
            mb={{
              "&:not(:last-of-type)": "1rem"
            }}
            pt={{
              "&:not(:first-of-type)": {
                _: "1rem",
                lg: 0
              }
            }}
            borderTop={{
              "&:not(:first-of-type)": {
                _: "1px solid",
                lg: "none"
              }
            }}
            borderTopColor={{
              "&:not(:first-of-type)": "grayscale.gray3"
            }}
          >
            <OptionInfoContent key={`${infoIndex.toString()}`} {...infoItem} />
          </x.div>
        );
      })}
    </>
  );
};

export default OptionInfoItem;
