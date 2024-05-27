import { x } from "@xstyled/emotion";
import { FC } from "react";

import { CartDataType } from "@src/components/contents/Cart/types";
import getDiscountInfoText from "@src/components/contents/Cart/utils/getDiscountInfoText";
import { useFormStoreContext } from "@src/hooks/useFormStoreContext";
import { getFormattedPrice } from '@src/utils/getFormattedPrice';

const ContentBottom: FC<Omit<CartDataType, "items">> = ({ discountArr, finalPrice, bonusPercentage }) => {
  const useStore = useFormStoreContext();
  const fetcherData = useStore((state) => state.fetcherData);

  return (
    <x.div bg="primary.white" py={{ _: "2rem", sm: "2.5rem" }} px={{ _: "1.5rem", sm: "2.5rem" }} textAlign="center">
      <x.p fontWeight="500" fontSize="0.75rem" lineHeight="1rem" color="tercial.indigo1Alpha50">
        <span>Celkem za pojištění{!fetcherData.shortTerm && " /rok"}:</span>
        {getDiscountInfoText({ discountArr, bonusPercentage }) && (
          <>
            <br />
            <span>({getDiscountInfoText({ discountArr, bonusPercentage })})</span>
          </>
        )}
      </x.p>

      <x.p pt="0.5rem" fontWeight="500" fontSize="2rem" lineHeight="2.25rem" color="tercial.indigo1">
        {getFormattedPrice({ price: finalPrice })}
      </x.p>
    </x.div>
  );
};

export default ContentBottom;
