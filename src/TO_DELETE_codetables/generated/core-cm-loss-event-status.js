"use strict";
export const coreCmLossEventStatus = [
    { code: 'REJECTED', langDescription: 'Zamítnuta', allowsUpdate: false },
    { code: 'CLOSED', langDescription: 'Ukončena', allowsUpdate: false },
    { code: 'CANCELED', langDescription: 'Zrušena', allowsUpdate: false },
    { code: 'OPENED', langDescription: 'Otevřena', allowsUpdate: true },
    { code: 'POSTPONED', langDescription: 'Odložena', allowsUpdate: true },
    { code: 'CREATED', langDescription: 'Založena', allowsUpdate: true },
];
