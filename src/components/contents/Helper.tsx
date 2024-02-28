import { x } from "@xstyled/emotion";
import { FC, PropsWithChildren } from "react";

const Helper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <x.div mt="0.5rem" fontSize="0.625rem" lineHeight="0.875rem" color="grayscale.grayWarm">
      {children}
    </x.div>
  );
};

export default Helper;
