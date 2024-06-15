// import {
//   AutoSjednavacFetchRequestType,
//   AutoSjednavacFetchResponseType,
// } from '@src/schema/types/AutoSjednavacFetchType';
import { FormType } from '@src/types';
import { TODO } from '@src/utils/todo';

type FleetsAutoSjednavacFetchRequestType = TODO;
type FleetsAutoSjednavacFetchResponseType = TODO;

type AutoSjednavacFetchRequestType = TODO;
type AutoSjednavacFetchResponseType = TODO;

// Make sure that the keys of FetcherRequestOptionType and FetcherResponseOptionType are the same
// and that keys are correctly picked from template literal `FormType` from @src/types/index.ts
type FetcherRequestOptionType = {
  autosjednavac: AutoSjednavacFetchRequestType;
  'autosjednavac-zarazeni-do-flotily': FleetsAutoSjednavacFetchRequestType;
};

type FetcherResponseOptionType = {
  autosjednavac: AutoSjednavacFetchResponseType;
  'autosjednavac-zarazeni-do-flotily': FleetsAutoSjednavacFetchResponseType;
};

export type FormFetcherType = keyof Pick<
  { [K in FormType]: any },
  'autosjednavac'
>;
export const formFetcherType: ReadonlyArray<FormFetcherType> = [
  'autosjednavac',
];

export type FetcherRequestType<T extends FormFetcherType> =
  FetcherRequestOptionType[T];
export type FetcherResponseType<T extends FormFetcherType> =
  FetcherResponseOptionType[T];
