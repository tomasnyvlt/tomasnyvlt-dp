import { FC } from "react";

import BlockingInfo from "@src/components/contents/ValidationInfo/components/BlockingInfo";
import FakeField from "@src/components/contents/ValidationInfo/components/FakeField";
import { useStepValidation } from "@src/components/contents/ValidationInfo/hooks/useStepValidation";

const ValidationInfo: FC = () => {
  const { activeErrorMessages, fakeFields, handleErrorMessageActivation } = useStepValidation();

  return (
    <>
      {!!fakeFields?.length &&
        fakeFields.map((field) => (
          <FakeField key={field.name} field={field} handleErrorMessageActivation={handleErrorMessageActivation} />
        ))}

      <BlockingInfo errorMessages={activeErrorMessages} />
    </>
  );
};

export default ValidationInfo;
