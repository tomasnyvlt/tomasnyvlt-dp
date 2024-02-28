import { Field, useFormApi } from "@data-driven-forms/react-form-renderer";
import { x } from "@xstyled/emotion";
import { FC, Fragment, useEffect, useId } from "react";

import ImageOrLottie from "@src/components/contents/ImageOrLottie";
import { SpzFetchFieldType } from "@src/types/fetchComponents";

const SpzFetchField: FC<SpzFetchFieldType> = ({ fields, inputName, buttonName, file }) => {
  const { renderForm } = useFormApi();
  const id = useId();

  useEffect(() => {
    const inputEl = document.querySelector<HTMLInputElement>(`input[name="${inputName}"]`);
    const buttonEl = document.querySelector<HTMLButtonElement>(`button[name="${buttonName}"]`);

    if (!inputEl) return undefined;

    // Listen to enter
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;

      e.preventDefault();
      inputEl.blur();
      buttonEl?.click();
    };

    inputEl.addEventListener("keydown", handleEnter);

    return () => {
      inputEl.removeEventListener("keydown", handleEnter);
    };
  }, [inputName, buttonName]);

  return (
    <x.div borderColor="grayscale.gray4" boxShadow="default" borderRadius="20">
      <x.div
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        gap="1rem"
        position="relative"
        minHeight="1.375rem"
        borderBottom="1px solid"
        borderColor="grayscale.gray4"
        p="1.5rem"
        mb={0}
        top={0}
      >
        <x.p
          fontSize="1.125rem"
          lineHeight="1.375rem"
          minHeight="1.375rem"
          fontWeight={600}
          textAlign={{ _: "left", sm: "center" }}
          w="100%"
          px={{ sm: "4rem" }}
        >
          Údaje o vozidle pro výpočet ceny
        </x.p>
      </x.div>

      <x.div py="1.5rem" display="flex" alignItems="center" justifyContent="space-evenly" w="100%">
        <x.div
          pl="1.5rem"
          pr={{
            _: "1.5rem",
            xs: "0"
          }}
          w="min(100%, 18rem)"
          display="flex"
          flexDirection="column"
          gap="1rem"
          flex="1 0 auto"
        >
          {fields.map((field, i) => (
            <Fragment key={field.component + i.toString()}>{renderForm([field as Field])}</Fragment>
          ))}
        </x.div>

        <x.div
          display={{
            _: "none",
            xs: "flex"
          }}
          alignItems="center"
          justifyContent="center"
          px="1.5rem"
          w="100%"
        >
          <ImageOrLottie name={id} file={file} />
        </x.div>
      </x.div>
    </x.div>
  );
};

export default SpzFetchField;
