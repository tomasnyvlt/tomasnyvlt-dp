import { SectionType } from '@src/types';
import { getFetcherData } from '@src/utils/getFetcherData';
import getRandomId from '@src/utils/getRandomId';

export const photoInstructions: SectionType = {
  component: 'section',
  name: getRandomId(),
  variant: 'withBorder',
  fields: [
    {
      component: 'box',
      name: getRandomId(),
      condition: {
        when: 'photoCheck',
        is: (value: string) =>
          value === 'CHECK_BY_CLIENT' || value === 'CHECK_BY_AGENT',
      },
      fields: [
        {
          component: 'heading',
          name: getRandomId(),
          initialValue: '4 jednoduché kroky k nafocení vozidla',
          css: {
            as: 'h2',
            textAlign: 'left',
            mt: '1.5rem',
            fontWeight: 500,
            mb: '2.5rem',
          },
        },
        {
          component: 'info-box',
          name: getRandomId(),
          css: { mb: '3.5rem', w: { sm: '25.4375rem' } },
          content:
            '{"blocks":[{"key":"bqubj","text":"Pro jistotu jsme vám všechny informace pošleme i do e-mailu.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":21,"length":38,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
        },
        {
          component: 'numbered-steps',
          css: { marginBottom: '2.5rem', marginTop: '3.5rem' },
          name: getRandomId(),
          steps: [
            'Dokončit sjednání pojištění přes web',
            'Stáhnout si mobilní aplikaci Direct. Podporujeme iOS a Android.',
            'Vyfotit a nahrát fotografie vozidla přímo z aplikace',
            'Hotovo, fotografie zkontrolujeme a dáme vám vědět!',
          ],
        },
        {
          component: 'info-box',
          name: getRandomId(),
          css: {
            mb: { _: '1.5rem', sm: '2.5rem' },
            maxW: { sm: '25.4375rem' },
            mt: '2.5rem',
          },
          content:
            '{"blocks":[{"key":"bqubj","text":"Vozidlo nemusíte fotit rovnou. Stačí, když nám fotografie pošlete ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dakj2","text":"5 dnů před začátkem smlouvy.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":28,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
        },
      ],
    },
    {
      component: 'box',
      name: getRandomId(),
      css: {
        display: { sm: 'grid' },
        gridTemplateColumns: '1fr 1fr',
        mt: { sm: '3.5rem' },
      },
      fields: [
        {
          component: 'box',
          name: getRandomId(),
          css: { display: 'flex', alignItems: 'center' },
          fields: [
            {
              component: 'checkbox-field',
              css: { minHeight: { sm: '3.5rem' }, mt: { _: '2.5rem', sm: 0 } },
              initialValue: true,
              label:
                '{"blocks":[{"key":"bqubj","text":"Prohlídka proběhne v místě bydliště","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              name: 'inspectionPermanentAddress',
            },
          ],
        },
        {
          component: 'smartform-field',
          css: { mt: { _: '1rem', sm: 0 } },
          instance: 'photoVehicle',
          name: 'alternateAddressPhotoVehicle',
          label: 'Adresa',
          isRequired: true,
          validate: [
            { type: 'address-smartform', message: 'Adresa není kompletní.' },
            { type: 'required', message: 'Prosím zadejte adresu.' },
          ],
          condition: {
            when: 'inspectionPermanentAddress',
            is: false,
          },
        },
      ],
      condition: {
        when: 'photoCheck',
        is: 'CHECK_BY_ENGINNER',
      },
    },
  ],
  resolveProps: () => {
    const data = getFetcherData('autosjednavac');
    const { value } = data.casco.carCheckRequired;

    return { hideField: !value };
  },
};
