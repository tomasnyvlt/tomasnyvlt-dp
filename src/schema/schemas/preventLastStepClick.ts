import { PreventNextStepType } from '@src/types';
import { SUITABILITY_RECORD_FIELDS } from '@src/schema/schemas/cart';

export const preventLastStepClick: PreventNextStepType[] = [
  {
    message: JSON.stringify({
      blocks: [
        {
          key: 'f71rt',
          text: 'Doplňte prosím všechny požadované údaje do záznamu z jednání.',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    }),
    userType: ['internal'],
    fieldNames: [
      SUITABILITY_RECORD_FIELDS.request,
      SUITABILITY_RECORD_FIELDS.recommendation,
      SUITABILITY_RECORD_FIELDS.difference,
    ],
  },
];
