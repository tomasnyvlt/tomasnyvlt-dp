import { x } from "@xstyled/emotion";
import { FC } from "react";

import { CardPersonItemType } from "@src/types";

interface CardPersonItemProps {
  personItems: CardPersonItemType[];
}

const CardPersonItem: FC<CardPersonItemProps> = ({ personItems }) => {
  return (
    <>
      {personItems.filter(Boolean).map((item, index) => (
        <x.div key={`${index.toString()}`} mt={{ "&:not(:first-of-type)": "0.5rem" }}>
          <x.p fontWeight="500" color="grayscale.gray1Alpha50" lineHeight="1rem" fontSize="0.75rem">
            {item?.label}
          </x.p>
          <x.p fontWeight="500" color="primary.black" lineHeight="1rem" fontSize="0.75rem">
            {item?.value}
          </x.p>
        </x.div>
      ))}
    </>
  );
};

export default CardPersonItem;
