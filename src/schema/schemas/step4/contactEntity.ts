import { SectionType } from '@src/types';
import { getFetcherData } from '@src/utils/getFetcherData';
import getRandomId from '@src/utils/getRandomId';

export const contactEntity: SectionType = {
  component: 'section',
  variant: 'withBorder',
  name: getRandomId(),
  condition: {
    when: 'photoCheck',
    is: 'CHECK_BY_ENGINNER',
  },
  fields: [
    {
      component: 'heading',
      name: getRandomId(),
      initialValue: 'Kontaktní osoba',
      css: { as: 'h2', color: 'primary.black', mt: '1.5rem' },
    },
    {
      component: 'box',
      css: { display: { sm: 'grid' }, gridTemplateColumns: '1fr 1fr' },
      name: getRandomId(),
      fields: [
        {
          component: 'heading',
          css: { as: 'p', color: 'primary.black50', mt: '0.5rem' },
          name: getRandomId(),
          initialValue:
            'Koho máme kontaktovat, abychom mohli dohodnout prohlídku vozidla?',
        },
        { component: 'box', name: getRandomId() },
        {
          component: 'box',
          name: getRandomId(),
          css: { display: 'flex', alignItems: 'center' },
          fields: [
            {
              component: 'checkbox-field',
              css: { minH: { sm: '5.875rem' }, mt: { _: '2rem', sm: 0 } },
              initialValue: true,
              label:
                '{"blocks":[{"key":"bqubj","text":"Pro sjednání termínu kontaktujte mě","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              name: 'inspectionPhone',
            },
          ],
        },
        {
          component: 'box',
          name: getRandomId(),
          css: { mt: { _: '2rem', sm: '1rem' } },
          fields: [
            {
              component: 'text-field',
              name: 'alternatePhone',
              label: 'Telefonní číslo',
              helper: 'Telefonní čísla s předvolbou +420 nebo +421',
              css: { pt: '3rem' },
              initialValue: '+420',
              isRequired: true,
              inputProps: {
                _input: {
                  maxLength: 13,
                  type: 'tel',
                },
              },
              validate: [
                {
                  type: 'phone',
                },
                { type: 'required', message: 'Prosím vyplňte' },
              ],
              condition: {
                when: 'inspectionPhone',
                is: false,
              },
            },
          ],
        },
      ],
    },
    {
      component: 'info-box',
      name: getRandomId(),
      topCss: { mt: { _: '2rem', sm: '3.5rem' }, mb: '2.625rem' },
      content:
        '{"blocks":[{"key":"bqubj","text":"Pro jistotu jsme vám všechny informace poslali i do e-mailu.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":21,"length":39,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
    },
  ],
  resolveProps: () => {
    const data = getFetcherData('autosjednavac');
    const { value } = data.casco.carCheckRequired;

    return { hideField: !value };
  },
};
