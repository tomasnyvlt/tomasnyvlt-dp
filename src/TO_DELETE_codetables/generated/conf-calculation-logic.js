"use strict";
export const confCalculationLogic = [
    {
        code: 'CALCULATION',
        langDescription: 'Výpočtová logika',
        orderColumn: 1,
        availableOnFe: true,
        isDefault: true,
    },
    {
        code: 'VALIDATION',
        langDescription: 'Logika kontrol a validaci',
        orderColumn: 2,
        availableOnFe: true,
        isDefault: false,
    },
    {
        code: 'INTERACTION',
        langDescription: 'Logika interakce s uživatelem',
        orderColumn: 4,
        availableOnFe: true,
        isDefault: false,
    },
    {
        code: 'MAPPING',
        langDescription: 'Logika mapovaní dat na položky core systému',
        orderColumn: 3,
        availableOnFe: true,
        isDefault: false,
    },
];
