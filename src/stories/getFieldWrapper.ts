import {
  DesignComponentType,
  FormFieldsType,
  LayoutFieldsType,
  SectionType,
} from '@src/types';
import { FetchComponentType } from '@src/types/fetchComponents.ts';
import { generateUniqueKey } from '@src/utils/generateUniqueKey.ts';

export const getFieldWrapper = ({
  title,
  sectionContent,
}: {
  title: string;
  sectionContent: Array<
    | LayoutFieldsType
    | DesignComponentType
    | FormFieldsType
    | SectionType
    | FetchComponentType
  >;
}) => {
  return {
    fields: [
      {
        component: 'wizard',
        name: 'customWizard',
        formType: 'autosjednavac',
        fields: [
          {
            component: 'step',
            name: 'formStep',
            title: title,
            fields: [
              {
                component: 'section',
                css: {
                  mt: '3rem',
                },
                name: generateUniqueKey(),
                fields: sectionContent,
              },
            ],
          },
        ],
      },
    ],
  };
};
