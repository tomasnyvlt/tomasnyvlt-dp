import { x } from "@xstyled/emotion";
import { FC } from "react";

import { RadioInfoListType } from "@src/types";

const RadioInfoList: FC<RadioInfoListType> = ({ info, description }) => {
  return (
    <x.div display="flex" flexDirection="column" pl="2.5rem">
      <x.p fontSize="0.75rem" lineHeight="1rem" color="primary.black50">
        {description}
      </x.p>
      {info?.map((value, index) => {
        return (
          <x.p fontSize="0.75rem" lineHeight="1rem" fontWeight="500" color="primary.black" key={`${index.toString()}`}>
            - {value}
          </x.p>
        );
      })}
    </x.div>
  );
};

export default RadioInfoList;
