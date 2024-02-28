import { SystemProps } from '@xstyled/emotion';
import { ElementType } from 'react';

import { GridType, SectionType } from '@src/types';
import { getFetcherData } from '@src/utils/getFetcherData';
import getRandomId from '@src/utils/getRandomId';
import { additionals } from '@src/schema/schemas/step2/packages/additionals';
import { assistance } from '@src/schema/schemas/step2/packages/assistance';
import { casco } from '@src/schema/schemas/step2/packages/casco';
import { mtpl } from '@src/schema/schemas/step2/packages/mtpl';

const mtplCascoContainerInitStyle: SystemProps & { as?: ElementType<'div'> } = {
  gridTemplateColumns: { _: '1', sm: '1', lg: '2' },
  gap: '1.5rem',
  mt: 0,
};

const disabledMtplContainerGapStyle: Pick<SystemProps, 'gap'>['gap'] = '1.5rem';

export const packages: SectionType = {
  component: 'section',
  name: getRandomId(),
  fields: [
    {
      component: 'box',
      name: 'boxWithContentInfoVehicle',
      css: {
        background: 'white',
        px: { sm: '2rem' },
        pb: '2rem',
        mt: {
          _: '2.5rem',
          sm: '4.375rem',
        },
        position: 'relative',
        zIndex: 2,
      },
      fields: [
        {
          component: 'grid',
          css: mtplCascoContainerInitStyle,
          name: getRandomId(),
          fields: [
            {
              component: 'info-box',
              topCss: {
                mt: { _: '1.5rem', sm: '2.5rem' },
                order: { _: 1, sm: 'initial' },
              },
              content:
                '{"blocks":[{"key":"bqubj","text":"V cenách je zohledněný váš bonus. Více","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":34,"length":4,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"#modal=bonus-modal","targetOption":"_self"}}}}',
              name: getRandomId(),
              variant: 'info',
              css: { w: '100%' },
            },
            {
              component: 'box',
              css: {
                display: { _: 'none', lg: 'flex' },
                order: { _: 3, sm: 'initial' },
              },
              name: getRandomId(),
              condition: {
                when: 'casco.selected',
                is: false,
                then: { visible: true },
                else: { visible: false, set: {} },
              },
            },
            {
              component: 'box',
              name: getRandomId(),
              css: { display: { _: 'none', lg: 'flex' } },
              condition: {
                when: 'casco.selected',
                is: false,
                then: { visible: false },
                else: { visible: true, set: {} },
              },
            },

            mtpl,
            assistance,
            {
              name: getRandomId(),
              component: 'box',
              css: { display: 'flex', order: 6 },
              condition: {
                when: 'casco.selected',
                is: false,
              },
              fields: [
                {
                  component: 'info-box',
                  content:
                    '{"blocks":[{"key":"bqubj","text":"45 % našich klientů myslí i na svoje vozidla!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
                  name: getRandomId(),
                  variant: 'info',
                  topCss: { w: '100%' },
                  css: { w: '100%' },
                },
              ],
              resolveProps: (_props, _fieldApi, formOptions) => {
                const data = getFetcherData('autosjednavac');
                const { values } = formOptions.getState();

                const isHidden =
                  data?.casco?.hidden ||
                  (values?.dontHaveSpz &&
                    (values?.vehicle?.type.value === 'OTHER_VEHICLE' ||
                      values?.vehicle?.type.value === 'BIKE_WITH_ENGINE'));

                return {
                  hideField: isHidden,
                };
              },
            },
            {
              name: getRandomId(),
              component: 'box',
              css: { display: { _: 'none', lg: 'flex' }, order: 7 },
              condition: {
                when: 'casco.selected',
                is: false,
              },
            },
            casco,
            {
              name: getRandomId(),
              component: 'box',
              css: { order: 9 },
              resolveProps: (_props, _fieldApi, formOptions) => {
                const data = getFetcherData('autosjednavac');
                const enabled = data?.feConfig?.bannerCasco.enabled;
                const { values } = formOptions.getState();

                const isHidden =
                  data?.casco?.hidden ||
                  (values?.dontHaveSpz &&
                    (values?.vehicle?.type.value === 'OTHER_VEHICLE' ||
                      values?.vehicle?.type.value === 'BIKE_WITH_ENGINE'));

                return {
                  hideField: !enabled || isHidden,
                };
              },
              fields: [
                {
                  component: 'info-box',
                  topCss: { w: '100%', h: 'auto' },
                  content: '',
                  name: getRandomId(),
                  variant: 'info',
                  css: { w: '100%' },
                  resolveProps: () => {
                    const data = getFetcherData('autosjednavac');

                    const { text1, text2 } = data?.feConfig?.bannerCasco || {};

                    return {
                      htmlRichtext: `<p style="color: #5A2382; font-size: 0.875rem; line-height: 1.125rem;font-weight: 500">${text1}</p><br/><p style="color: #5A2382; font-size: 0.625rem; line-height: 0.875rem;">${text2}</p>`,
                    };
                  },
                },
              ],
            },
          ],
          resolveProps: (_props, _fieldApi, formOptions) => {
            const { values } = formOptions.getState();
            return {
              css: {
                ...mtplCascoContainerInitStyle,
                // Prevent small gap between mtpl and casco when mtpl is disabled
                // and has no bottom padding due to styling
                gap: !values?.mtpl
                  ? disabledMtplContainerGapStyle
                  : mtplCascoContainerInitStyle.gap,
              },
            };
          },
        },
        {
          component: 'box',
          name: getRandomId(),
          css: {
            borderTop: '1px solid',
            borderColor: 'grayscale.gray4',
            mt: { _: '1.5rem', sm: '3.25rem' },
          },
          fields: [
            {
              component: 'heading',
              name: getRandomId(),
              initialValue: 'Doplňková pojištění',
              css: {
                as: 'h2',
                textAlign: 'left',
                fontWeight: 500,
                pt: '1.5rem',
              },
            },
            additionals as GridType,
          ],
          resolveProps: () => {
            const { additionals: additionalsData } =
              getFetcherData('autosjednavac') || {};

            const hideField =
              !additionalsData?.glassLimits &&
              !additionalsData?.directClaimManagementOptions &&
              !additionalsData?.baggageLimits &&
              !additionalsData?.premiumWarrantyOptions &&
              !additionalsData?.injuryDriverLimits &&
              !additionalsData?.parentsOptions;

            return {
              hideField,
            };
          },
        },
      ],
    },
  ],
};
