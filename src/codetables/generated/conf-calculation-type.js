"use strict";
export const confCalculationType = [
    {
        code: 'FORMULA',
        langDescription: 'Výpočtový vzorec',
        tabname: 'formula',
        orderColumn: 2,
        availableOnFe: true,
        isDefault: false,
    },
    {
        code: 'DB_CALL',
        langDescription: 'Výpočtový vzorec, který obsahuje volání uložené funkci/procedury',
        tabname: 'formula',
        orderColumn: 3,
        availableOnFe: false,
        isDefault: false,
    },
    {
        code: 'DB_TABS',
        langDescription: 'Výpočtový vzorec, který vybíra z DB',
        tabname: 'formula',
        orderColumn: 4,
        availableOnFe: false,
        isDefault: false,
    },
    {
        code: 'TARIFF_TABLE',
        langDescription: 'Sazebník',
        tabname: 'tariff',
        orderColumn: 1,
        availableOnFe: true,
        isDefault: false,
    },
];
