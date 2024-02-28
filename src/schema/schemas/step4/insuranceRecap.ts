import getCartDataFromFetcher from '@src/components/contents/Cart/utils/getCartDataFromFetcher';
import { SectionType } from '@src/types';
import { getFetcherData } from '@src/utils/getFetcherData';
import getFormattedPrice from '@src/utils/getFormattedPrice';
import getRandomId from '@src/utils/getRandomId';

export const insuranceRecap: SectionType = {
  component: 'section',
  name: getRandomId(),
  variant: 'withBorder',
  fields: [
    {
      component: 'heading',
      name: getRandomId(),
      initialValue: 'Sjednávaná pojištění',
      css: { as: 'h2', textAlign: 'left', mt: '1.5rem', fontWeight: 500 },
    },
    {
      component: 'box-with-content',
      name: getRandomId(),
      css: {
        mt: '1.875rem',
        borderRadius: '1.25rem',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        p: '1.25rem',
        display: { _: 'flex', sm: 'grid' },
        flexDirection: 'column',
      },
      resolveProps: (_props, _fieldApi, formOptions) => {
        const { values } = formOptions.getState();
        const fetcherData = getFetcherData('autosjednavac');
        const data = getCartDataFromFetcher({
          fetcherData,
          formType: 'autosjednavac',
          formValues: values,
        });
        const { premiumWarranty } = formOptions.getState().values.additionals;

        return {
          customContent: {
            items: [
              ...data.items.map((item) => ({
                label: item.description,
                value: item.formattedPrice,
              })),
              premiumWarranty && {
                label: 'Garance ceny pojištění na 3 roky',
                value: getFormattedPrice({
                  price: fetcherData?.additionals?.premiumWarranty?.price,
                  withYear: !fetcherData?.shortTerm,
                }) as string,
              },
            ],
          },
        };
      },
    },
  ],
};
