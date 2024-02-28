import { useEffect, useState } from 'react';

import config from '@src/config';
import dpApiFetch from '@src/utils/dpApiFetch';

interface Output {
  flagEnabled: boolean;
}

export const useFeatureFlag = (
  flagName: string,
  fetchHeaders: Record<string, any> = {}
): Output => {
  const [flagEnabled, setFlagEnabled] = useState<boolean>(false);

  useEffect(() => {
    const fetchFeatureFlag = async () => {
      // 200 response with empty body means the flag is enabled
      // 401 response means the flag is disabled

      try {
        const isEnabled = await dpApiFetch<boolean>({
          method: 'GET',
          url: `${config.directApiUrl}/api/services/rest/utils/feature/permit/${flagName}`,
          nonJsonResponse: true,
          headers: fetchHeaders,
        });

        setFlagEnabled(!!isEnabled);
      } catch (e) {
        setFlagEnabled(false);
      }
    };

    fetchFeatureFlag();
  }, [flagName]);

  return { flagEnabled };
};
