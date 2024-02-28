import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';
import { FEATURE_FLAGS } from '@src/schema/schemas/constants/featureFlags';
import getDeepObjectValue from '@src/utils/getDeepObjectValue';

const infoBoxContentDefault = JSON.stringify({
  blocks: [
    {
      key: 'bqubj',
      text: 'Smlouvu, dočasnou zelenou kartu a všechny ostatní dokumenty jsme vám poslali na e\u2011mail.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [
        { offset: 0, length: 31, style: 'BOLD' },
        { offset: 69, length: 18, style: 'BOLD' },
      ],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
});

export const payment: SectionType = {
  component: 'section',
  name: getRandomId(),
  css: { mt: '1rem' },
  fields: [
    {
      component: 'heading',
      initialValue: 'Už zbývá jen zaplatit a máte hotovo',
      name: getRandomId(),
      css: { as: 'h1', textAlign: 'center', mt: '3rem' },
    },
    {
      component: 'box',
      css: { display: 'flex', justifyContent: 'center' },
      name: getRandomId(),
      fields: [
        //{
        //component: 'payment-overview',
        //name: getRandomId(),
        // TODO : make payment-overview dynamic in future, similar to fetch-field by adding types to set EP
        //},
      ],
    },
    {
      component: 'info-box',
      css: { mt: '2.5rem', maxW: '26.4375rem' },
      name: getRandomId(),
      variant: 'info',
      content: infoBoxContentDefault,
      resolveProps: (_props, _fieldApi, formOptions) => {
        const { values } = formOptions.getState();
        const isOnlinePaymentOnlyEnabled = getDeepObjectValue({
          obj: values,
          keys: FEATURE_FLAGS.ONLINE_PAYMENT_ONLY.split('.'),
        });

        return {
          content: !isOnlinePaymentOnlyEnabled
            ? infoBoxContentDefault
            : JSON.stringify({
                blocks: [
                  {
                    key: 'bqubj',
                    text: 'Potvrzení o uzavření pojistné smlouvy a zelenou kartu po uhrazení pojištění pošleme na e\u2011mail. O zaplacení vás budeme informovat SMS i e\u2011mailem.',
                    type: 'unstyled',
                    depth: 0,
                    inlineStyleRanges: [
                      { offset: 0, length: 53, style: 'BOLD' },
                      { offset: 76, length: 17, style: 'BOLD' },
                    ],
                    entityRanges: [],
                    data: {},
                  },
                ],
                entityMap: {},
              }),
        };
      },
    },
  ],
};
