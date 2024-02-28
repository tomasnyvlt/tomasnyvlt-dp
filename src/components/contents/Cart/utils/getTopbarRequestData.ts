import { FormType } from '@src/types';
import config from '@src/config';

export interface TopbarRequestDataType<T = string> {
  email: T;
  pdf: T;
}

export interface TopbarRequestOutput {
  url: TopbarRequestDataType;
  headers?: TopbarRequestDataType<Record<string, string>>;
}

const getTopbarRequestData = (
  formType: FormType
): TopbarRequestOutput | null => {
  switch (formType) {
    case 'autosjednavac': {
      const vehicleHeaders = {
        'x-source': 'WEB_VEHICLE_R',
      };

      const url: TopbarRequestDataType = {
        email: `${config.directApiUrl}/api/latest/rest/vehicle/insurance/v5/offer?email=true`,
        pdf: `${config.directApiUrl}/api/latest/rest/vehicle/insurance/v5/offer?pdf=true`,
      };

      const headers: TopbarRequestDataType<Record<string, string>> = {
        email: vehicleHeaders,
        pdf: vehicleHeaders,
      };

      return {
        url,
        headers,
      };
    }
    default: {
      return null;
    }
  }
};

export default getTopbarRequestData;
