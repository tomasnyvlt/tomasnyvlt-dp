import { ConditionDefinition } from "@data-driven-forms/react-form-renderer";

export const cascoDiscountVisibleCondition: ConditionDefinition = {
  and: [
    {
      when: "casco.selected",
      is: (isCascoSelected: boolean) => isCascoSelected
    },
    {
      or: [
        {
          when: "casco",
          is: (casco: Record<string, any>) => {
            const { animalLimit, carAccidentLimit, naturalLimit, theftLimit, packageId } = casco || {};

            if (packageId !== "id4") return false;

            const packagesArr = [animalLimit, carAccidentLimit, naturalLimit, theftLimit];

            return packagesArr.some((packageItem) => packageItem !== "0");
          }
        },
        {
          and: [
            {
              when: "casco.packageId",
              is: (packageId: string) => packageId !== "id4"
            },
            {
              when: "vehicle.actualValue",
              is: (vehicleValue: number) => (vehicleValue || 0) > 0
            }
          ]
        }
      ]
    }
  ]
};
