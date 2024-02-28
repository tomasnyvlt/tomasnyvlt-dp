import { SchemaType } from "@src/types";

const getStepNames = (schema: SchemaType): string[] => {
  const [wizard] = schema.fields;
  const steps = wizard.fields;

  const stepNames = steps.map((step) => step.name);

  return stepNames;
};

export default getStepNames;
