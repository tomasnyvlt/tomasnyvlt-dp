import { SectionType } from '@src/types';
import getRandomId from '@src/utils/getRandomId';

export const checkboxSection: SectionType = {
  component: 'section',
  name: getRandomId(),
  css: {
    borderTop: '1px solid',
    borderColor: 'grayscale.gray4',
    // TODO RequiredInfo - remove this `mb` if required info will return
    mb: '2rem',
  },
  fields: [
    {
      component: 'grid',
      name: getRandomId(),
      css: { gridTemplateColumns: { sm: '1fr 1fr' }, gap: '0 1.5rem' },
      fields: [
        {
          component: 'box',
          css: {
            p: 0,
            m: 0,
            display: 'flex',
            spaceY: '2rem',
            flexDirection: 'column',
          },
          name: getRandomId(),
          fields: [
            {
              component: 'checkbox-field',
              checkboxAlignTop: true,
              isRequired: true,
              name: 'termsAgreement2',
              label:
                '{"blocks":[{"key":"bqubj","text":"Prohlašuji, že jsem všechny dotazy zodpověděl/a pravdivě a úplně, a že mám pojistný zájem, tedy oprávněnou potřebu ochrany před následky pojistné události.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
              validate: [
                { type: 'required', message: 'Bez souhlasu to nepůjde.' },
              ],
            },
            {
              component: 'checkbox-field',
              checkboxAlignTop: true,
              withArrowDownIcon: true,
              name: 'marketingAgreement',
              hiddenLabel:
                '{"blocks":[{"key":"bqubj","text":"Společnosti, které jsou s námi propojené ve skupině VIGO (zejm. Direct Fidoo a.s. a Direct auto, s.r.o.) nebo se kterými obchodně spolupracujeme, vás mohou na základě tohoto souhlasu čas od času oslovit telefonicky, e-mailem nebo prostřednictvím SMS s novinkami o činnosti, nových produktech, službách a exkluzivních nabídkách (dále jen nabídky). Tento souhlas zahrnuje předání osobních údajů nezbytných pro vytvoření nabídky členům skupiny VIGO (zejm. Direct Fidoo a.s. a Direct auto, s.r.o.). Nikomu jinému vaše osobní údaje pro marketingové účely nepředáváme. Osobními údaji, které budeme na základě vašeho souhlasu pro tento účel zpracovávat a předávat výše uvedeným společnostem, jsou jméno, příjmení a kontaktní údaje (adresa, telefon, e-mail) a dále informace o využívaní služeb včetně související segmentace a typizace klienta. Marketingové zpracování zahrnuje profilování, které vyhodnocuje údaje o vás a vašich sjednaných produktech a slouží k tomu, abychom vás oslovili jen s takovými nabídkami, které dávají smysl a mohou vás zajímat. Z odběru novinek a nabídek se můžete kdykoli odhlásit přes odkaz na odhlášení obsažený v každé zasílané zprávě. Souhlas můžete také kdykoli odvolat v sekci osobní údaje na www.direct.cz, napsáním e- mailu (z e-mailové adresy, kterou máte u nás evidovanou) na qinfo@direct.cz  nebo telefonátem na naši klientskou linku 221 221 221 . Odvolání souhlasu nemá vliv na již provedené zpracování. Další podrobnosti o zpracování osobních údajů si před udělením souhlasu prostudujte v Informaci o zpracování osobních údajů.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":1219,"length":13,"key":0},{"offset":1306,"length":15,"key":1},{"offset":1364,"length":12,"key":2}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://www.direct.cz","targetOption":"_blank"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"url":"mailto:qinfo@direct.cz","targetOption":"_blank"}},"2":{"type":"LINK","mutability":"MUTABLE","data":{"url":"tel:+420221221221","targetOption":"_blank"}}}}',
              label:
                '{"blocks":[{"key":"bqubj","text":"Souhlasím se zasíláním marketingových zpráv od členů skupiny VIGO (zejm. Direct Fidoo a.s. a Direct echo s.r.o.), jejichž seznam naleznete na www.direct.cz/osobniudaje. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":9,"style":"BOLD"}],"entityRanges":[{"offset":142,"length":26,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://www.direct.cz/osobniudaje","targetOption":"_blank"}}}}',
            },
          ],
        },
        {
          component: 'checkbox-field',
          css: { mt: { _: '1.75rem', sm: '0' } },
          checkboxAlignTop: true,
          isRequired: true,
          name: 'termsAgreement',
          hiddenLabel:
            '{"blocks":[{"key":"bqubj","text":"Osobní údaje zpracováváme především proto, abychom mohli sjednat, uzavřít a plnit smlouvu, dodržovat právní povinnosti a taky chránit naše a vaše oprávněné zájmy. Mezi oprávněné zájmy patří i přímý marketing spočívající v zasílání obchodních sdělení, která se týkají naší činnosti, produktů a služeb. Při zpracování osobních údajů se řídíme všemi pravidly stanovenými právními předpisy.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
          withArrowDownIcon: true,
          label:
            '{"blocks":[{"key":"bqubj","text":"Přečetl/a jsem si rekapitulaci pojištění a pojistné podmínky, rozumím jim a potvrzuji, že sjednávané pojištění odpovídá mým potřebám a požadavkům. Seznámil/a jsem se s informacemi o zpracování osobních údajů a svých právech. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":168,"length":56,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://www.direct.cz/osobniudaje","targetOption":"_blank"}}}}',
          validate: [{ type: 'required', message: 'Bez souhlasu to nepůjde.' }],
        },
      ],
    },
  ],
};
