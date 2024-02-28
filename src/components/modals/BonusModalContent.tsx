import { x } from "@xstyled/emotion";
import { FC } from "react";

import getDiscount from "@src/components/contents/Cart/utils/vehicle/getDiscount";
import { getFetcherData } from "@src/utils/getFetcherData";

const defaultParagraphStyle = { fontSize: "0.875rem", lineHeight: "1.125rem" };

const BonusModalContent: FC = () => {
  const data = getFetcherData("autosjednavac");
  const { ckpBonusIncluded, ckpBonusPercent, ckpClaims, ckpMonthsTotal, casco, mtpl } = data;

  const constructDiscountBox = () => {
    const bonus = Number(ckpBonusPercent?.replace("%", "").trim() || 0);
    const client = "Váš ";

    const mappedStrings = {
      "info.bonus.negative": (
        <x.p {...defaultParagraphStyle}>
          Cenu pojištění jsme upravili o{" "}
          <strong>
            {client} malus {bonus} %.
          </strong>
        </x.p>
      ),
      "info.bonus.positive": (
        <x.p {...defaultParagraphStyle}>
          Cenu pojištění jsme snížili o{" "}
          <strong>
            {client} bonus {bonus} %.
          </strong>
        </x.p>
      ),
      "info.bonus.none": <x.p {...defaultParagraphStyle}>Nezapočítali jsme vám žádný bonus ani malus.</x.p>,
      "info.bonus.zero": (
        <x.p {...defaultParagraphStyle}>
          Váš bonus je <strong>0 %.</strong> Vypočítali jsme ho na základě údajů z České kanceláře pojistitelů
        </x.p>
      ),
      "info.bonus.error": (
        <x.p {...defaultParagraphStyle}>
          V tuto chvíli se nám nepodařilo ověřit váš bonus. Budeme to zkoušet znovu a při sjednání smlouvy vám dáme
          vědět, jak to dopadlo.
        </x.p>
      )
    };

    if (bonus === 0) {
      const claims = ckpClaims;
      const months = ckpMonthsTotal;
      const ckp = ckpBonusIncluded ? (!claims && !months ? "none" : "zero") : "error";
      return mappedStrings[`info.bonus.${ckp}`];
    }

    const path = bonus > 0 ? "positive" : "negative";
    return mappedStrings[`info.bonus.${path}`];
  };

  const discounts = [mtpl, casco]
    .map((item) => getDiscount(item))
    .filter((discount) => discount)
    .join(" a ") as string;

  return (
    <x.div px="2rem">
      {constructDiscountBox()}
      {discounts && (
        <x.p {...defaultParagraphStyle} pt="0.75rem">
          Zároveň jsme vám za sjednání započítali slevu <x.span fontWeight="600">{discounts}.</x.span>
        </x.p>
      )}
      <x.p {...defaultParagraphStyle} pt="1.5rem">
        Počet měsíců pojištění celkem: <x.span fontWeight="600">{ckpMonthsTotal}</x.span>
      </x.p>
      <x.p {...defaultParagraphStyle} pt="0.25rem">
        Počet nehod celkem: <x.span fontWeight="600">{ckpClaims}</x.span>
      </x.p>
    </x.div>
  );
};

export default BonusModalContent;
