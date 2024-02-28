"use strict";
export const coreFmPaymentGuaranteeStatusReason = [
    {
        reasonCode: 'CREATED',
        statusCode: 'INITIAL',
        langDescription: 'Vytvořená',
    },
    {
        reasonCode: 'PENDING',
        statusCode: 'PENDING',
        langDescription: 'Nevyřízená',
    },
    {
        reasonCode: 'GUARANTEED',
        statusCode: 'PENDING',
        langDescription: 'Garantovaná',
    },
    {
        reasonCode: 'COMPLETED',
        statusCode: 'DONE',
        langDescription: 'Dokončená (proplacená garantem)',
    },
    {
        reasonCode: 'CANCELED',
        statusCode: 'CANCELED',
        langDescription: 'Zrušená',
    },
    {
        reasonCode: 'REJECTED',
        statusCode: 'CANCELED',
        langDescription: 'Odmítnutá',
    },
    {
        reasonCode: 'EXPORTED',
        statusCode: 'PENDING',
        langDescription: 'Exportovaná',
    },
];
