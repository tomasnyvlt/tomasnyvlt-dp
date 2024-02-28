"use strict";
export const confFieldFormat = [
    {
        code: 'dd.mm.yyyy',
        langDescription: 'Klasické datum',
        orderColumn: 3,
        availableOnFe: true,
        isDefault: false,
    },
    {
        code: '>0',
        langDescription: 'Kladné číslo',
        orderColumn: 1,
        availableOnFe: true,
        isDefault: false,
    },
    {
        code: '>=0',
        langDescription: 'Nezaporné číslo',
        orderColumn: 2,
        availableOnFe: true,
        isDefault: false,
    },
    {
        code: 'FREE',
        langDescription: 'Bez validaci na výčet povolených hodnot',
        orderColumn: 4,
        availableOnFe: true,
        isDefault: false,
    },
];
