import { x } from "@xstyled/emotion";
import { FC, PropsWithChildren } from "react";

const Tag: FC<PropsWithChildren> = ({ children }) => {
  return (
    <x.div
      position="absolute"
      right="-1rem"
      top="-0.625rem"
      w="fit-content"
      px="0.5rem"
      py="0.25rem"
      background="linear-gradient(77.45deg, #5A53E1 0%, #CC7EFF 69.65%, #C098F2 100%)"
      borderRadius="12.5rem"
      pointerEvents="none"
      zIndex="2"
    >
      <x.p fontSize="0.75rem" lineHeight="1rem" fontWeight="500" color="primary.white">
        {children}
      </x.p>
    </x.div>
  );
};

export default Tag;
