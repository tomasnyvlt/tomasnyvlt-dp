"use strict";
export const confFrameworkType = [
    {
        code: 'INSURANCE_PRODUCT',
        langDescription: 'Pojistný produkt',
        isDefault: true,
        availableOnFe: true,
        orderColumn: 1,
    },
    {
        code: 'FE_CONFIG',
        langDescription: 'Konfigurace pro FE',
        isDefault: false,
        availableOnFe: true,
        orderColumn: 2,
    },
    {
        code: 'OTHER',
        langDescription: 'Ostatní',
        isDefault: false,
        availableOnFe: true,
        orderColumn: 99,
    },
    {
        code: 'TEST',
        langDescription: 'Testovací projekt',
        isDefault: false,
        availableOnFe: true,
        orderColumn: 98,
    },
    {
        code: 'OBJECT_VALUE',
        langDescription: 'Kalkulace hodnoty objektu pojištění',
        isDefault: false,
        availableOnFe: true,
        orderColumn: 3,
    },
    {
        code: 'INSURANCE_FLEET',
        langDescription: 'Ramcové pojištění',
        isDefault: false,
        availableOnFe: true,
        orderColumn: 4,
    },
];
