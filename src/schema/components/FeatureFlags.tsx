import { useFormApi } from '@data-driven-forms/react-form-renderer';
import { FC, useEffect } from 'react';

import { FEATURE_FLAGS } from '@src/schema/schemas/constants/featureFlags';
import { useFeatureFlag } from '@src/utils/useFeatureFlag';

const vehicleFetchHeaders: Record<string, any> = {
  'x-source': 'WEB_VEHICLE_R',
};

const FeatureFlags: FC = () => {
  const { change } = useFormApi();

  const { flagEnabled: orvFlagEnabled } = useFeatureFlag(
    'VEHICLE_INSURANCE_ORV',
    vehicleFetchHeaders
  );
  const { flagEnabled: onlinePaymentOnlyFlagEnabled } = useFeatureFlag(
    'getProductConfig_VEHICLE_INSURANCE_POV_online',
    vehicleFetchHeaders
  );

  useEffect(() => {
    change(FEATURE_FLAGS.ORV_ENABLED, orvFlagEnabled);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orvFlagEnabled]);

  useEffect(() => {
    change(FEATURE_FLAGS.ONLINE_PAYMENT_ONLY, onlinePaymentOnlyFlagEnabled);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlinePaymentOnlyFlagEnabled]);

  return null;
};

export default FeatureFlags;
