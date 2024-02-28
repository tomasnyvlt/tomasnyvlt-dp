export declare const coreFmAccountType: ({
    code: string;
    langDescription: string;
    category: string;
    accountingNumber: number;
    multiCurrency: boolean;
    allowReallocation: boolean;
    isBalanced: boolean;
    entityTable?: undefined;
    tradingAccountFor?: undefined;
} | {
    code: string;
    langDescription: string;
    category: string;
    accountingNumber: number;
    entityTable: string;
    multiCurrency: boolean;
    allowReallocation: boolean;
    isBalanced: boolean;
    tradingAccountFor?: undefined;
} | {
    code: string;
    langDescription: string;
    category: string;
    accountingNumber: number;
    entityTable: string;
    tradingAccountFor: string;
    multiCurrency: boolean;
    allowReallocation: boolean;
    isBalanced: boolean;
} | {
    code: string;
    langDescription: string;
    category: string;
    accountingNumber: number;
    tradingAccountFor: string;
    multiCurrency: boolean;
    allowReallocation: boolean;
    isBalanced: boolean;
    entityTable?: undefined;
})[];
