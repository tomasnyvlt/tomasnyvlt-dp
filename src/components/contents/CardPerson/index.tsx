import { UseFieldApiProps, useFieldApi } from "@data-driven-forms/react-form-renderer";
import { x } from "@xstyled/emotion";
import { FC } from "react";

import CardContent from "@src/components/contents/CardPerson/components/CardContent";
import { CardPersonType } from "@src/types/layout";

type UseFieldApiType = UseFieldApiProps<any, HTMLElement> &
  Pick<CardPersonType, "person" | "tags" | "items" | "twoColumnsLayout" | "description">;

const CardPerson: FC<CardPersonType> = (props) => {
  const { person, tags, items, description, twoColumnsLayout = false } = useFieldApi(props) as UseFieldApiType;

  const { namePrefix, firstName, lastName, companyName } = person || {};
  const personHeading = [namePrefix, firstName, lastName, companyName].filter(Boolean).join(" ").trim();

  return (
    <x.div boxShadow="cardCheckbox" w="100%" p="1.5rem" borderRadius="1.25rem">
      {tags?.length && (
        <x.div display="flex" gap="0.5rem" flexWrap="wrap">
          {tags.filter(Boolean).map((tag) => (
            <x.div
              key={tag}
              w="fit-content"
              px="0.5rem"
              py="0.25rem"
              background="linear-gradient(77.45deg, #5A53E1 0%, #CC7EFF 69.65%, #C098F2 100%)"
              borderRadius="12.5rem"
            >
              <x.p fontSize="0.75rem" lineHeight="1rem" fontWeight="500" color="primary.white">
                {tag}
              </x.p>
            </x.div>
          ))}
        </x.div>
      )}

      <x.p fontWeight="500" fontSize="1.125rem" lineHeight="1.375rem" mt="1rem" mb={description ? "0" : "2rem"}>
        {personHeading}
      </x.p>

      {description && (
        <x.p fontWeight="700" fontSize="1.125rem" lineHeight="1.375rem" mt="1rem" mb="1.5rem">
          {description}
        </x.p>
      )}

      {!!items?.length && <CardContent items={items} twoColumnsLayout={twoColumnsLayout} />}
    </x.div>
  );
};

export default CardPerson;
