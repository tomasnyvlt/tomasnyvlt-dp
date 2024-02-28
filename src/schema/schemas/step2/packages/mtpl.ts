import { CardCheckboxType } from '@src/types';
import { getFetcherData } from '@src/utils/getFetcherData';
import { getFetcherDataExtended } from '@src/utils/getFetcherDataExtended';
import getFormattedPrice from '@src/utils/getFormattedPrice';
import { LimitType } from '@src/schematypes/AutoSjednavacFetchType';

export const mtpl: CardCheckboxType = {
  component: 'card-checkbox',
  label: 'Povinné ručení',
  name: 'mtpl.selected',
  initialValue: true,
  validate: [
    {
      type: 'required-if',
      fields: { 'casco.selected': false },
      message:
        'Vyberte si alespoň jednu z možností - Povinné ručení, nebo Havarijní pojištění',
    },
  ],
  helper:
    '{"blocks":[{"key":"bqubj","text":"Jak si správně nastavit limit pojištění?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":40,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=jak-nastavit-limit-pojisteni","targetOption":"_self"}}}}',
  resolveProps: (_props, _fieldApi, formOptions) => {
    const { data, isFetchLoading } = getFetcherDataExtended('autosjednavac');
    const { values } = formOptions.getState();
    const isDisabled = (): boolean => {
      // CASCO and MTPL are both disabled - allow user to choose one of them
      if (!values.casco?.selected && !values.mtpl?.selected) return false;

      return !values.casco?.selected;
    };

    return {
      price: data?.mtpl?.premiumTotal ?? 0,
      priceShortTerm: data?.shortTerm,
      defaultSalesDiscount: data?.mtpl?.defaultSalesDiscount,
      editMode: values.mtpl?.editBasicLimit,
      isDisabled: isDisabled(),
      isPriceLoading: isFetchLoading,
      css: { order: { _: 2, sm: values.mtpl?.selected ? 3 : 5 } },
    };
  },
  fields: [
    {
      component: 'radio-select-container',
      label: 'Nastavte si limit',
      initialValue: '100',
      name: 'mtpl.basicLimit',
      options: [],
      resolveProps: () => {
        const data = getFetcherData('autosjednavac');

        return {
          options: data?.mtpl?.basicLimits
            ?.filter(
              (limit: LimitType) => ![0].includes(parseInt(limit.value, 10))
            )
            .map((limit: LimitType) => ({
              label: limit.description,
              value: limit.value,
              price: getFormattedPrice({
                price: limit.premium,
                withYear: !data.shortTerm,
              }),
            })),
        };
      },
    },
  ],
};
