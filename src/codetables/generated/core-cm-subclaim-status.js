"use strict";
export const coreCmSubclaimStatus = [
    { code: 'OPENED', langDescription: 'Otevřen', allowsUpdate: true },
    { code: 'POSTPONED', langDescription: 'Odložen', allowsUpdate: true },
    { code: 'CREATED', langDescription: 'Založen', allowsUpdate: true },
    { code: 'REJECTED', langDescription: 'Zamítnut', allowsUpdate: false },
    { code: 'CLOSED', langDescription: 'Ukončen', allowsUpdate: false },
    { code: 'CANCELED', langDescription: 'Zrušen', allowsUpdate: false },
];
