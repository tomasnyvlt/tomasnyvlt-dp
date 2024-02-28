import { x } from "@xstyled/emotion";
import { FC } from "react";

const RequiredInfo: FC = () => {
  return (
    <x.div borderTop="1px solid" borderColor="grayscale.gray4" py="2rem" mt="2rem">
      <x.p fontSize="0.75rem" lineHeight="1rem" color="primary.black" textAlign="center" fontWeight="500">
        Bez údajů označených hvězdičkou (*)
        <br />
        se neobejdeme.
      </x.p>
    </x.div>
  );
};

export default RequiredInfo;
