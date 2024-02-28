"use strict";
export const coreFmPaymentOrderType = [
    {
        code: 'DIRECT_DEBIT_BORDERO',
        langDescription: 'Přeplatek vyúčtování bordero',
        sourceAccountTypeCode: 'ASSETS_SALES_PARTNER',
        sourceMovementTypeCode: 'BULK_REFUND_SALES_PARTNER',
        liabilityAccountTypeCode: 'LIABILITIES_SALES_PARTNER',
        liabilityMovementCategories: ['BULK_PAYMENT'],
        dependentEntityCode: 'BULK_PAYMENT',
    },
    {
        code: 'POSTAL_SLIPS_B',
        langDescription: 'Platba prostřednictvím poštovních poukázek typu B',
        sourceAccountTypeCode: 'ASSETS_SALES_PARTNER',
        sourceMovementTypeCode: 'BULK_DEPOSIT_SALES_PARTNER',
        liabilityAccountTypeCode: 'LIABILITIES_SALES_PARTNER',
        liabilityMovementCategories: ['BULK_PAYMENT'],
        dependentEntityCode: 'BULK_PAYMENT',
    },
    {
        code: 'REFUND_UNASSIGNED_PAYMENT',
        langDescription: 'Vrácení nepřiřazené platby',
        liabilityAccountTypeCode: 'LIABILITIES_UNASSIGNED_PAYMENT',
        liabilityMovementCategories: ['ERROR'],
        dependentEntityCode: 'UNASSIGNED_PAYMENT',
    },
    {
        code: 'DIRECT_DEBIT_COMMISSION',
        langDescription: 'Výplata provizí',
        liabilityAccountTypeCode: 'LIABILITIES_COMMISSION',
        liabilityMovementCategories: ['COMMISSION_PAYMENT'],
        dependentEntityCode: 'COMMISSION_STATEMENT',
    },
    {
        code: 'BANK_TRANSFER',
        langDescription: 'Převod mezi Direct bankovními účty',
        liabilityAccountTypeCode: 'ASSETS_MONEY',
        liabilityMovementCategories: ['TRANSFER', 'EXCHANGE'],
    },
    {
        code: 'DIRECT_DEBIT_POLICY',
        langDescription: 'Přeplatek pojistného',
        sourceAccountTypeCode: 'ASSETS_POLICY',
        sourceMovementTypeCode: 'POLICY_REFUND_DIRECT_DEBIT',
        liabilityAccountTypeCode: 'LIABILITIES_OVERPAYMENT',
        liabilityMovementCategories: ['POLICY_PAYMENT'],
    },
];
