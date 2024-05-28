"use strict";
export const confValueType = [
    {
        code: 'ALLOWED',
        langDescription: 'Povolená',
        orderColumn: 1,
        availableOnFe: true,
        isDefault: true,
    },
    {
        code: 'MAXIMUM',
        langDescription: 'Maximální',
        orderColumn: 3,
        availableOnFe: true,
        isDefault: false,
    },
    {
        code: 'MINIMUM',
        langDescription: 'Minimální',
        orderColumn: 2,
        availableOnFe: true,
        isDefault: false,
    },
    {
        code: 'UMAX',
        langDescription: 'Maximální - úpis',
        orderColumn: 5,
        availableOnFe: true,
        isDefault: false,
    },
    {
        code: 'UMIN',
        langDescription: 'Minimální - úpis',
        orderColumn: 4,
        availableOnFe: true,
        isDefault: false,
    },
    {
        code: 'IGNORED_ON_INPUT',
        langDescription: 'Ignorovaná na vstupu',
        orderColumn: 7,
        availableOnFe: true,
        isDefault: false,
    },
    {
        code: 'DEFAULT_ON_INPUT',
        langDescription: 'Defaultní na vstupu',
        orderColumn: 6,
        availableOnFe: true,
        isDefault: false,
    },
];
