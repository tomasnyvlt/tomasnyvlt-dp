import { useFieldApi } from "@data-driven-forms/react-form-renderer";
import { x } from "@xstyled/emotion";
import { FC } from "react";

import { BoxContentItemType, BoxContentType, BoxWithContentType } from "@src/types";

const getItemKey = (label: string, index: number) => {
  return `${label.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()}_${index}`;
};

const BoxWithContent: FC<BoxWithContentType> = ({ variant = "basic", css, ...props }) => {
  const { input, customContent, content, spacing } = useFieldApi(props);
  const valueOrContent = content ?? input.value.content;

  const spacingStyle =
    spacing === "space-between"
      ? {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }
      : {};

  return (
    <x.div mt="2rem" p="1.5rem" boxShadow="formBox" borderRadius={20} {...css}>
      {(valueOrContent as BoxContentType)?.items
        ?.filter((item) => item)
        .map((item, i) => (
          <x.p {...spacingStyle} fontSize="0.75rem" lineHeight="1rem" key={getItemKey(item.label, i)}>
            <x.span color={variant === "reversed-color" ? "grayscale.gray2" : "primary.black"}>{item.label}:</x.span>
            <x.span color={variant === "reversed-color" ? "primary.black" : "grayscale.gray2"} fontWeight={500}>
              {item.value}
            </x.span>
          </x.p>
        ))}

      {customContent?.items
        .filter((item: BoxContentItemType) => item)
        .map((item: BoxContentItemType, index: number) => (
          <x.p
            {...spacingStyle}
            key={getItemKey(item.label ?? "", index)}
            fontWeight={500}
            fontSize="0.875rem"
            lineHeight="1.125rem"
          >
            <x.span color={variant === "reversed-color" ? "grayscale.gray2" : "primary.black"} display="block">
              {item.label}
            </x.span>
            <x.span color={variant === "reversed-color" ? "primary.black" : "grayscale.gray2"} display="block">
              {item.value}
            </x.span>
          </x.p>
        ))}
    </x.div>
  );
};

export default BoxWithContent;
