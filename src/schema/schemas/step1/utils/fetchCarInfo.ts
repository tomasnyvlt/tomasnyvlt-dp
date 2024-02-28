import setFormValuesFromDataObject from '@src/utils/setFormValuesFromDataObject';
import { CAR_INSURANCE_FORM_BODY_LS_KEY } from '@src/schema/constants';
import config from '@src/config';
import dpApiFetch from '@src/utils/dpApiFetch';

export const fetchCarInfo = async (spz: string, change: any) => {
  try {
    const body = await dpApiFetch({
      method: 'GET',
      url: `${config.directApiUrl}/api/latest/rest/vehicle/ckp/load?spz=${spz?.toUpperCase()}`,
      headers: {
        'x-source': 'WEB_VEHICLE_R',
      },
    });

    localStorage.setItem(
      CAR_INSURANCE_FORM_BODY_LS_KEY,
      JSON.stringify({ vehicle: body, preloaded: true })
    );
    setFormValuesFromDataObject({ change, data: body, prefix: 'vehicle' });
  } catch (e: any) {
    change('displayAllVehicleInfo', true);
  }
};
