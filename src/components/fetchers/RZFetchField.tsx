import { Field, useFormApi } from "@data-driven-forms/react-form-renderer";
import { x } from "@xstyled/emotion";
import { FC, useEffect, useId } from "react";

import ImageOrLottie from "@src/components/contents/ImageOrLottie";
import { SpzFetchFieldType } from "@src/types/fetchComponents";

const RZFetchField: FC<SpzFetchFieldType> = ({ fields, inputName, buttonName, file }) => {
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
    <x.div boxShadow="default" borderRadius="20">
      <x.div
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        gap="1.5rem"
        position="relative"
        minHeight="1.375rem"
        p="1.5rem"
      >
        <x.p
          fontSize="1.125rem"
          lineHeight="1.375rem"
          minHeight="1.375rem"
          fontWeight={500}
          textAlign="left"
          w="100%"
          color="primary.black"
        >
          Údaje o vozidle pro výpočet ceny
        </x.p>
      </x.div>

      <x.div
        boxShadow={{
          _: "0 -0.25rem 0.25rem -0.1rem rgba(51, 51, 51, 0.04), 0 -0.25rem 1rem -0.1rem rgba(51, 51, 51, 0.08)"
        }}
        borderRadius="20"
      >
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
            {renderForm(fields as Field[])}
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
            <ImageOrLottie css={{ w: "10rem" }} name={id} file={file} />
          </x.div>
        </x.div>
      </x.div>
    </x.div>
  );
};

export default RZFetchField;
