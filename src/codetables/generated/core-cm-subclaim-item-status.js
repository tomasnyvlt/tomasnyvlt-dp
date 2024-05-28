"use strict";
export const coreCmSubclaimItemStatus = [
    {
        code: 'CANCELED',
        langDescription: 'Zrušen',
        orderColumn: 1,
        allowsUpdate: false,
        availableOnFe: true,
    },
    {
        code: 'CLOSED',
        langDescription: 'Ukončen',
        orderColumn: 2,
        allowsUpdate: false,
        availableOnFe: true,
    },
    {
        code: 'CREATED',
        langDescription: 'Založen',
        orderColumn: 3,
        allowsUpdate: true,
        availableOnFe: true,
    },
    {
        code: 'OPENED',
        langDescription: 'Otevřen',
        orderColumn: 4,
        allowsUpdate: true,
        availableOnFe: true,
    },
    {
        code: 'POSTPONED',
        langDescription: 'Odložen',
        orderColumn: 5,
        allowsUpdate: true,
        availableOnFe: true,
    },
    {
        code: 'REJECTED',
        langDescription: 'Zamítnut',
        orderColumn: 6,
        allowsUpdate: false,
        availableOnFe: true,
    },
];
