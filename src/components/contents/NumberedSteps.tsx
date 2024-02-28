import { x } from "@xstyled/emotion";
import { FC } from "react";

import { NumberedStepsType } from "@src/types/layout";

const NumberedSteps: FC<NumberedStepsType> = ({ steps }) => {
  return (
    <x.div p="1.5rem" boxShadow="cardCheckbox" borderRadius="2rem">
      <x.ol display="flex" flexDirection="column" spaceY="1.25rem">
        {steps?.map((step, index) => {
          return (
            <x.li
              key={`${index.toString()}`}
              border="1px solid"
              borderColor="grayscale.gray3"
              borderRadius="1.25rem"
              background="primary.white"
              display="grid"
              gridTemplateColumns={{ _: "1fr 3fr", sm: "1fr 7fr" }}
            >
              <x.div
                background="linear-gradient(90deg, #EAF3AA 0%, #F0F6C3 100%)"
                borderRadius="1.25rem 0rem 0rem 1.25rem"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <x.div
                  w="1.4375rem"
                  h="1.4375rem"
                  backgroundColor="primary.greenDirectDarker"
                  borderRadius="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <x.div
                    fontWeight="500"
                    fontSize="0.875rem"
                    lineHeight="1.25rem"
                    textAlign="center"
                    color="primary.white"
                  >
                    {index + 1}
                  </x.div>
                </x.div>
              </x.div>
              <x.div h={{ sm: "4.4375rem" }} display="flex" alignItems="center" py={{ _: "1.25rem", sm: "0" }}>
                <x.p
                  pl="1.5rem"
                  fontSize="0.875rem"
                  lineHeight="1.125rem"
                  fontWeight={400}
                  color="primary.blackText"
                  pr="3.125rem"
                >
                  {step}
                </x.p>
              </x.div>
            </x.li>
          );
        })}
      </x.ol>
    </x.div>
  );
};

export default NumberedSteps;
