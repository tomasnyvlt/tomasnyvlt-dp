import { x } from "@xstyled/emotion";
import { FC } from "react";

const FetchError: FC = () => {
  return (
    <x.div px="2rem">
      <x.p>Litujeme, ale váš požadavek se nepodařilo dokončit.</x.p>
    </x.div>
  );
};

export default FetchError;
