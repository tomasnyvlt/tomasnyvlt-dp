import { x } from "@xstyled/emotion";
import { FC } from "react";

import InfoBox from "@src/components/contents/InfoBox";
import {
  VALIDATION_INFO_DATA_ATTR,
  VALIDATION_INFO_FIELD_NAME
} from "@src/components/contents/ValidationInfo/constants";

interface BlockingInfoProps {
  errorMessages?: string[];
}

const BlockingInfo: FC<BlockingInfoProps> = ({ errorMessages }) => {
  if (!errorMessages?.length) return null;

  return (
    <x.div
      display="flex"
      justifyContent="center"
      gap="1rem"
      borderTop="1px solid"
      borderColor="grayscale.gray4"
      py="2rem"
      {...{ [VALIDATION_INFO_DATA_ATTR]: true }}
    >
      <InfoBox component="info-box" content={errorMessages} name={VALIDATION_INFO_FIELD_NAME} variant="error" />
    </x.div>
  );
};

export default BlockingInfo;
