"use strict";
export const commNotificationSecurityType = [
    { code: 'BASIC', langDescription: 'Basic auth vhodná na dev/test' },
    { code: 'STATIC_TOKEN', langDescription: 'Předgenerovaný statický token' },
    {
        code: 'BEARER',
        langDescription: 'Bearer token: preferovaná varianta pro produkci',
    },
    { code: 'NONE', langDescription: 'Bez autentizace' },
];
