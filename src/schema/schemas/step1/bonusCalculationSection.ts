import { HELPER } from '@src/constants/helper';
import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';
import { getOwnerAndOperatorCheckboxes } from '@src/schema/schemas/common/getOwnerAndOperatorCheckboxes';
import { getPersonSectionFields } from '@src/schema/schemas/common/getPersonSectionFields';

const partner = getPersonSectionFields({
  title: 'Údaje pro zjištění bonusu',
  fieldKey: 'partner',
  fieldsType: 'basic',
  helpers: {
    personalIn: 'Potřebujeme ho znát pro výpočet bonusu',
    email: 'Pro případ, že si kalkulaci budete chtít uložit',
    phone: HELPER.phone,
  },
  minAge: 18,
  minAgeErrorMsg: 'Minimální věk pro sjednání je {age} let.',
});

const checkboxes = getOwnerAndOperatorCheckboxes({
  vehicleOperator: {
    order: 1,
    label:
      'Jsem provozovatel zapsaný v malém technickém průkazu (ovliňuje cenu)',
  },
  vehicleOwner: {
    order: 2,
  },
});

const bonusCalculationSection: SectionType = {
  component: 'section',
  name: getRandomId(),
  variant: 'withBorder',
  fields: [
    ...partner,
    checkboxes,
    /**
     * Info box
     */
    {
      component: 'info-box',
      topCss: { mt: { _: '2rem', sm: '2.5rem' } },
      name: getRandomId(),
      css: { maxW: '25.4375rem' },
      variant: 'infoNoBorder',
      content:
        '{"blocks":[{"key":"bqubj","text":"Na vámi zadané údaje vás může po dobu 30 dnů kontaktovat náš operátor s nabídkou nejlepší ceny nebo ohledně přípravy smlouvy. Zadáním údajů potvrzujete, že jste se seznámil/a s Informacemi o zpracování osobních údajů u správce Direct pojišťovna.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":177,"length":68,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://www.direct.cz/osobniudaje","targetOption":"_blank"}}}}',
    },
  ],
};

export default bonusCalculationSection;
