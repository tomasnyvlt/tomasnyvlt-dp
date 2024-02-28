"use strict";
export const coreCcPaymentFrequency = [
    {
        code: 'SINGLE',
        langDescription: 'Jednorázově',
        periodic: false,
        paymentsNumber: 1,
    },
    { code: 'IRREGULARLY', langDescription: 'Nepravidelně', periodic: false },
    { code: 'UNLISTED', langDescription: 'Neuvedeno' },
    {
        code: 'ANNUALY',
        langDescription: 'Ročně',
        periodic: true,
        paymentsNumber: 1,
    },
    {
        code: 'SEMIANNUALY',
        langDescription: 'Pololetně',
        periodic: true,
        paymentsNumber: 2,
    },
    {
        code: 'QUARTERLY',
        langDescription: 'Čtvrtletně',
        periodic: true,
        paymentsNumber: 4,
    },
    {
        code: 'MONTHLY',
        langDescription: 'Měsíčně',
        periodic: true,
        paymentsNumber: 12,
    },
];
