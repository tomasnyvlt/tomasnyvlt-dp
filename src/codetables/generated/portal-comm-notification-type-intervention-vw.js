"use strict";
export const portalCommNotificationTypeInterventionVw = [
    {
        code: 'POLICY_FIRST_PAYMENT_REMINDER',
        coreEntityCode: 'POLICY',
        langDescription: 'Připomenutí první platby',
        dcAnnouncementTypeCode: 'INTERVENTION',
        orderColumn: 1,
    },
    {
        code: 'PAYMENT_REMINDER_OVERDUE',
        coreEntityCode: 'POLICY',
        langDescription: 'Upomínka následné platby po splatnosti',
        dcAnnouncementTypeCode: 'INTERVENTION',
        orderColumn: 2,
    },
    {
        code: 'POLICY_CASCO_CARCHECK_REQUIRE',
        coreEntityCode: 'POLICY',
        langDescription: 'Vznik požadavku k nafocení vozidla',
        dcAnnouncementTypeCode: 'INTERVENTION',
        orderColumn: 3,
    },
    {
        code: 'POLICY_CANCELLATION_REQUEST',
        coreEntityCode: 'POLICY',
        langDescription: 'Žádost o ukončení smlouvy',
        dcAnnouncementTypeCode: 'INTERVENTION',
        orderColumn: 4,
    },
];
