import { FEATURE_FLAGS } from '@src/schema/schemas/constants/featureFlags';
import getDeepObjectValue from '@src/utils/getDeepObjectValue';

const isOrvEnabled = (values: Record<string, any>): boolean => {
  return !!getDeepObjectValue({
    obj: values,
    keys: FEATURE_FLAGS.ORV_ENABLED.split('.'),
  });
};

const vehicleMaxWeight = (values: Record<string, any>): string => {
  return JSON.stringify({
    blocks: [
      {
        key: 'bqubj',
        text: 'Uvádějte v "kg" - Kde to najdu?',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [{ offset: 18, length: 13, key: 0 }],
        data: {},
      },
    ],
    entityMap: {
      '0': {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: {
          url: `#modal=${isOrvEnabled(values) ? 'maxWeightOrv' : 'maxWeight'}`,
          targetOption: '_self',
        },
      },
    },
  });
};

const vehicleLeadinDate = (values: Record<string, any>): string => {
  return JSON.stringify({
    blocks: [
      {
        key: 'bqubj',
        text: 'Např. 1. 1. 2022 - Kde to najdu?',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [{ offset: 19, length: 13, key: 0 }],
        data: {},
      },
      {
        key: 'f9h1o',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {
      '0': {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: {
          url: `#modal=${isOrvEnabled(values) ? 'leadinDateOrv' : 'leadinDate'}`,
          targetOption: '_self',
        },
      },
    },
  });
};

const vehicleEnginePower = (values: Record<string, any>): string => {
  return JSON.stringify({
    blocks: [
      {
        key: 'bqubj',
        text: 'Uvádějte v kW - Kde to najdu?',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [{ offset: 16, length: 13, key: 0 }],
        data: {},
      },
    ],
    entityMap: {
      '0': {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: {
          url: `#modal=${isOrvEnabled(values) ? 'enginePowerOrv' : 'enginePower'}`,
          targetOption: '_self',
        },
      },
    },
  });
};

const vehicleCategory = (values: Record<string, any>): string => {
  return JSON.stringify({
    blocks: [
      {
        key: 'cssu2',
        text: 'Jak to myslíme?',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [{ offset: 0, length: 15, key: 0 }],
        data: {},
      },
    ],
    entityMap: {
      '0': {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: {
          url: `#modal=${isOrvEnabled(values) ? 'vehicleCodeOrv' : 'vehicleCode'}`,
          targetOption: '_self',
        },
      },
    },
  });
};

const vehicleEngineDisplacement = (values: Record<string, any>): string => {
  return JSON.stringify({
    blocks: [
      {
        key: 'bqubj',
        text: 'Uvádějte v "ccm" - Kde to najdu?',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [{ offset: 19, length: 13, key: 0 }],
        data: {},
      },
      {
        key: 'f9h1o',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {
      '0': {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: {
          url: `#modal=${isOrvEnabled(values) ? 'engineVolumeOrv' : 'engineVolume'}`,
          targetOption: '_self',
        },
      },
    },
  });
};

const vehicleManufacturer = (values: Record<string, any>): string => {
  return JSON.stringify({
    blocks: [
      {
        key: 'bqubj',
        text: 'Doplňte tovární značku - Kde to najdu?',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [{ offset: 25, length: 13, key: 0 }],
        data: {},
      },
      {
        key: 'f9h1o',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {
      '0': {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: {
          url: `#modal=${isOrvEnabled(values) ? 'manufacturerOrv' : 'manufacturer'}`,
          targetOption: '_self',
        },
      },
    },
  });
};

const vehicleModel = (values: Record<string, any>): string => {
  return JSON.stringify({
    blocks: [
      {
        key: 'bqubj',
        text: 'Doplňte název modelu - Kde to najdu?',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [{ offset: 23, length: 13, key: 0 }],
        data: {},
      },
      {
        key: 'f9h1o',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {
      '0': {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: {
          url: `#modal=${isOrvEnabled(values) ? 'modelOrv' : 'model'}`,
          targetOption: '_self',
        },
      },
    },
  });
};

const vehicleVinOrEc = (values: Record<string, any>): string => {
  if (!isOrvEnabled(values)) {
    return 'Identifikátor vozidla (VIN/Evidenční číslo)';
  }

  return JSON.stringify({
    blocks: [
      {
        key: 'bqubj',
        text: 'Jaký je rozdíl mezi VIN a Evid. číslem?',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [{ offset: 0, length: 39, key: 0 }],
        data: {},
      },
      {
        key: 'f9h1o',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {
      '0': {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: { url: '#modal=vehicleEcOrv', targetOption: '_self' },
      },
    },
  });
};

const vehicleVin = (values: Record<string, any>): string => {
  if (!isOrvEnabled(values)) {
    return 'Naleznete ho na zadní straně malého technického průkazu.';
  }

  return JSON.stringify({
    blocks: [
      {
        key: 'bqubj',
        text: 'Naleznete ho na zadní straně malého technického průkazu  nebo osvědčení o registraci vozidla.',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [{ offset: 16, length: 77, key: 0 }],
        data: {},
      },
      {
        key: 'f9h1o',
        text: '',
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {
      '0': {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: { url: '#modal=vinOrv', targetOption: '_self' },
      },
    },
  });
};

const registrationBookNumber = (isOrvEnabledAttr: boolean): string => {
  return JSON.stringify({
    blocks: [
      {
        key: 'bqubj',
        text: `Číslo velkého technického průkazu${
          isOrvEnabledAttr ? ' nebo osvědčení o registraci vozidla' : ''
        }. Pokud ho neznáte, můžete ho doplnit později. Kde údaje najdete?`,
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          { offset: isOrvEnabledAttr ? 116 : 80, length: 18, key: 0 },
        ],
        data: {},
      },
    ],
    entityMap: {
      '0': {
        type: 'LINK',
        mutability: 'MUTABLE',
        data: {
          url: `#modal=${isOrvEnabledAttr ? 'registrationBookNumberOrv' : 'registrationBookNumber'}`,
          targetOption: '_self',
        },
      },
    },
  });
};

export const getOrvHelper = {
  vehicleMaxWeight,
  vehicleLeadinDate,
  vehicleEnginePower,
  vehicleCategory,
  vehicleEngineDisplacement,
  vehicleManufacturer,
  vehicleModel,
  vehicleVinOrEc,
  vehicleVin,
  registrationBookNumber,
};
