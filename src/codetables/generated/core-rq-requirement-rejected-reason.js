"use strict";
export const coreRqRequirementRejectedReason = [
    {
        code: 'NOT_PROVIDED_FROM_AUTHORIZED_PERSON',
        langDescription: 'Nedoloženo od majitele/zplnomocněné osoby.',
    },
    {
        code: 'PHOTOS_NOT_ACCORDING_INSTRUCTIONS',
        langDescription: 'Fotografie nedoloženy dle návodu.',
    },
    {
        code: 'MISSING_CLAIM_NUMBER',
        langDescription: 'Chybí číslo škodní události.',
    },
    {
        code: 'WRONG_ACCIDENT_DATE',
        langDescription: 'Špatné datum škodní události.',
    },
    { code: 'WRONG_RESOLUTION', langDescription: 'Chybné rozlišení fotografie' },
    { code: 'WRONG_VIN', langDescription: 'Chybně vyfocený VIN' },
    { code: 'DIRTY_WET_VEHICLE', langDescription: 'Špinavé nebo mokré vozidlo' },
    { code: 'FAR_AWAY_DISTANCE', langDescription: 'Foceno z velké dálky' },
    { code: 'WRONG_RESOLUTION_PORTRAIT', langDescription: 'Foceno na výšku' },
    { code: 'OPENED_WINDOW', langDescription: 'Otevřené okno vozidla' },
    { code: 'DAMAGED_WINDOW', langDescription: 'Poškozené sklo' },
    { code: 'DAMAGED_VEHICLE', langDescription: 'Poškozené vozidlo' },
    { code: 'OTHER', langDescription: 'Jiné' },
    {
        code: 'MISSING_DAMAGED_PROPERTY_LIST_AQUISITION_PRICE',
        langDescription: 'Chybí seznam poškozeného majetku a uvedení pořizovací ceny jednotlivých položek.',
    },
    {
        code: 'MISSING_DATE_ON_DOCUMENT',
        langDescription: 'Chybí datum na dokumentu.',
    },
    { code: 'MISSING_VIN', langDescription: 'Chybí VIN.' },
    {
        code: 'MISSING_OVERALLVIEW_DAMAGE_PHOTOS',
        langDescription: 'Chybí fotografie s celkovým pohledem poškození.',
    },
    {
        code: 'MISSING_MILEAGE_NUMBER',
        langDescription: 'Chybí počet ujetých kilometrů.',
    },
    {
        code: 'INCORRECT_VAT_ON_PRICE_OFFER',
        langDescription: 'Na cenové nabídce je chybně uvedená DPH.',
    },
    {
        code: 'INCORRECT_LICENCE_PLATE',
        langDescription: 'Chybná registrační značka vozidla.',
    },
    {
        code: 'MISSING_NAME_CONTACTINFO_LESSOR_SPARECAR',
        langDescription: 'Chybí název a kontaktní údaje na pronajímatele náhradního vozidla.',
    },
    {
        code: 'MISSING_CONTACT_PHONE',
        langDescription: 'Chybí kontaktní telefonní číslo.',
    },
    { code: 'MISSING_SUPPLIER', langDescription: 'Chybí uvedený dodavatel.' },
    {
        code: 'MISSING_ACCIDENT_DESCRIPTION',
        langDescription: 'Chybí popis nehodového děje.',
    },
    { code: 'MISSING_TCN', langDescription: 'Chybí číslo technického průkazu.' },
    { code: 'MISSING_SIGNATURE_STAMP', langDescription: 'Chybí podpis/razítko.' },
    { code: 'INCOMPLETE_DOCUMENT', langDescription: 'Dokument je nekompletní.' },
    { code: 'MISSING_CONTACT_EMAIL', langDescription: 'Chybí kontaktní e-mail.' },
    {
        code: 'MISSING_VEHICLE_OWNER_INFORMATION',
        langDescription: 'Chybí údaje vlastníka vozidla.',
    },
    { code: 'INVALID_DOCUMENT', langDescription: 'Dokument je neplatný.' },
    {
        code: 'MISSING_BACKSIDE_DOCUMENT',
        langDescription: 'Chybí přední strana dokumentu.',
    },
    {
        code: 'MISSING_SPARCARE_IDENTIFICATION',
        langDescription: 'Chybí identifikace vypůjčeného náhradního vozidla, jako je VIN, SPZ, palivo.',
    },
    {
        code: 'MISSING_PERMANENT_ADDRESS',
        langDescription: 'Chybí adresa trvalého pobytu.',
    },
    {
        code: 'MISSING_DAMAGED_OBJECT_IDENTIFICATION',
        langDescription: 'Chybí identifikace poškozeného předmětu.',
    },
    {
        code: 'MISSING_BREAKDOWN_PRICE_OFFER',
        langDescription: 'Chybí položkový rozpis u cenové nabídky.',
    },
    {
        code: 'MISSING_LICENCE_PLATE',
        langDescription: 'Chybí registrační značka vozidla.',
    },
    { code: 'MISSING_PURCHASER', langDescription: 'Chybí uvedený odběratel.' },
    {
        code: 'INCORRECT_TCN',
        langDescription: 'Chybné číslo technického průkazu.',
    },
    { code: 'UNREADABLE_DOCUMENT', langDescription: 'Dokument je nečitelný.' },
    {
        code: 'MISSING_PURCHASE_PRICE',
        langDescription: 'Chybí uvedení pořizovací ceny.',
    },
    {
        code: 'MISSING_DAMAGE_DETAIL_PHOTOS',
        langDescription: 'Chybí fotografie s detailem poškození.',
    },
    {
        code: 'MISSING_DATE_RENTING_RETURN_SPARECAR',
        langDescription: 'Chybí datum vypůjčení náhradního vozidla a jeho vrácení.',
    },
    {
        code: 'INCORRECT_VAT_ON_INVOICE',
        langDescription: 'Na faktuře je špatně uvedená DPH.',
    },
    { code: 'MISSING_SIGNATURE', langDescription: 'Chybí podpis.' },
    {
        code: 'MISSING_AFFIDAVIT_AGE_AQUISITION_DAMAGED_OBJECT',
        langDescription: 'Chybí čestné prohlášení o pořízení a stáří poškozeného předmětu.',
    },
    {
        code: 'MISSING_DAMAGE_CAUSE',
        langDescription: 'Chybí uvedení příčiny vzniku poškození.',
    },
    { code: 'MISSING_BIRTHDATE', langDescription: 'Chybí datum narození.' },
    {
        code: 'MISSING_FRONTSIDE_DOCUMENT',
        langDescription: 'Chybí zadní strana dokumentu.',
    },
    { code: 'INCORRECT_VIN', langDescription: 'Chybný VIN.' },
    { code: 'MISSING_COMPANY_ID', langDescription: 'Chybí IČO firmy.' },
    {
        code: 'INCORRECTLY_PHOTOGRAPHED_VIN',
        langDescription: 'Chybně vyfocený VIN.',
    },
    { code: 'QUALITY', langDescription: 'Špatná kvalita.' },
    {
        code: 'QUALITY_SUN_GLARE_OR_SHADOW',
        langDescription: 'Špatná kvalita způsobená sluncem - stíny nebo lesk.',
    },
    { code: 'MISSING_CODE', langDescription: 'Chybí kód pro nafocení.' },
    {
        code: 'QUALITY_MISSING_SIDES_OF_CAR',
        langDescription: 'Na fotografii nejsou vidět boky vozidla.',
    },
    {
        code: 'QUALITY_MISSING_VIEW_WITH_RP',
        langDescription: 'Na fotografii není viditelná SPZ.',
    },
    {
        code: 'QUALITY_MISSING_WHOLE_VEHICLE',
        langDescription: 'Na fotografii není nafocené celé vozidlo.',
    },
    { code: 'DIRTY_WET_GLASS', langDescription: 'Špinavé nebo mokré sklo' },
    { code: 'CLOSED_HOOD', langDescription: 'Zavřená kapota' },
    {
        code: 'MISSING_MILEAGE',
        langDescription: 'Chybí celkový stav najetých kilometrů',
    },
];
