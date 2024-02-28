import { x } from "@xstyled/emotion";
import { FC } from "react";

import CardPersonItem from "@src/components/contents/CardPerson/components/CardPersonItem";
import { CardPersonItemType, CardPersonType } from "@src/types";

type CardContentProps = Required<Pick<CardPersonType, "items" | "twoColumnsLayout">>;

const CardContent: FC<CardContentProps> = ({ items, twoColumnsLayout }) => {
  if (twoColumnsLayout) {
    return (
      <x.div display="grid" gridTemplateColumns="1fr 1fr">
        <x.div>
          {!!(items[0] as CardPersonItemType[])?.length && (
            <CardPersonItem personItems={items[0] as CardPersonItemType[]} />
          )}
        </x.div>
        <x.div>
          {!!(items[1] as CardPersonItemType[])?.length && (
            <CardPersonItem personItems={items[1] as CardPersonItemType[]} />
          )}
        </x.div>
      </x.div>
    );
  }

  return <CardPersonItem personItems={items as CardPersonItemType[]} />;
};

export default CardContent;
