export declare const coreFmPaymentOrderType: ({
    code: string;
    langDescription: string;
    sourceAccountTypeCode: string;
    sourceMovementTypeCode: string;
    liabilityAccountTypeCode: string;
    liabilityMovementCategories: string[];
    dependentEntityCode: string;
} | {
    code: string;
    langDescription: string;
    liabilityAccountTypeCode: string;
    liabilityMovementCategories: string[];
    dependentEntityCode: string;
    sourceAccountTypeCode?: undefined;
    sourceMovementTypeCode?: undefined;
} | {
    code: string;
    langDescription: string;
    liabilityAccountTypeCode: string;
    liabilityMovementCategories: string[];
    sourceAccountTypeCode?: undefined;
    sourceMovementTypeCode?: undefined;
    dependentEntityCode?: undefined;
} | {
    code: string;
    langDescription: string;
    sourceAccountTypeCode: string;
    sourceMovementTypeCode: string;
    liabilityAccountTypeCode: string;
    liabilityMovementCategories: string[];
    dependentEntityCode?: undefined;
})[];
