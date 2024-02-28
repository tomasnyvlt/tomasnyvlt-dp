"use strict";
export const coreSmRoleType = [
    {
        code: 'GENERAL',
        langDescription: 'Běžná agenda',
        priority: 1,
        reqUserAccount: false,
    },
    {
        code: 'CNB_STATEMENT',
        langDescription: 'Výkazy pro ČNB',
        priority: 8,
        reqUserAccount: false,
    },
    { code: 'GDPR', langDescription: 'GDPR', priority: 9, reqUserAccount: false },
    {
        code: 'NEWSLETTER',
        langDescription: 'Newsletter',
        priority: 10,
        reqUserAccount: false,
    },
    {
        code: 'COMMISSION',
        langDescription: 'Provize',
        priority: 7,
        reqUserAccount: false,
    },
    {
        code: 'SENSITIVE_CONTENT',
        langDescription: 'Citlivé informace',
        priority: 6,
        reqUserAccount: false,
    },
    {
        code: 'USER_ACCESS',
        langDescription: 'Přístupy',
        priority: 3,
        reqUserAccount: false,
    },
    {
        code: 'OTHER',
        langDescription: 'Ostatní',
        priority: 11,
        reqUserAccount: false,
    },
    {
        code: 'DOCUMENT_ADMINISTRATION',
        langDescription: 'Správa dokumentů',
        priority: 12,
        reqUserAccount: false,
    },
    {
        code: 'RETAIL_KEY_ACCOUNT_MANAGER',
        langDescription: 'KAM Retail',
        priority: 4,
        reqUserAccount: true,
    },
    {
        code: 'SME_KEY_ACCOUNT_MANAGER',
        langDescription: 'KAM SME',
        priority: 5,
        reqUserAccount: true,
    },
    {
        code: 'DISTRIBUTION_CONTROL',
        langDescription: 'Kontrola distribuce',
        priority: 13,
        reqUserAccount: false,
    },
    {
        code: 'ADMINISTRATION',
        langDescription: 'Správa pojistných smluv',
        priority: 2,
        reqUserAccount: false,
    },
];
