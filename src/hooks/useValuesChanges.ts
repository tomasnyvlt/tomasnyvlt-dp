import { useFormApi } from '@data-driven-forms/react-form-renderer';
import { useEffect, useRef, useState } from 'react';

import { FAKE_FIELD_NAME_PREFIX } from '@src/components/contents/ValidationInfo/constants';
import { FORM_STORE_REFRESH_TRIGGER_KEY } from '@src/constants/fields';
import { DELETE_PREFIX_VALUE } from '@src/utils/getRandomId';
import { getObjectChanges } from '@src/utils/getObjectChanges';

interface Output {
  changes: Record<string, any>;
  /**
   * Call this function to update old values object
   */
  updateChanges: () => void;
}

/**
 * Hook that returns changes between new and old form values.
 * Run updateChanges() to update comparator.
 */
const useValuesChanges = (): Output => {
  const { getState } = useFormApi();
  const { values } = getState();

  const valuesDependency = JSON.stringify(values);

  const [changes, setChanges] = useState<Record<string, any>>({});

  const previousValuesRef = useRef<Record<string, any>>();

  const updateChanges = (): void => {
    previousValuesRef.current = structuredClone(values);
    setChanges({});
  };

  useEffect(() => {
    const objectChanges = getObjectChanges({
      originalObj: previousValuesRef.current!,
      newObj: values,
    });

    const filteredObjectChanges = Object.keys(objectChanges).reduce(
      (acc, key) => {
        if (
          key === FORM_STORE_REFRESH_TRIGGER_KEY ||
          key.startsWith(DELETE_PREFIX_VALUE) ||
          key.startsWith(FAKE_FIELD_NAME_PREFIX)
        ) {
          return acc;
        }

        acc[key] = objectChanges[key];

        return acc;
      },
      {} as Record<string, any>
    );

    setChanges(filteredObjectChanges);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesDependency]);

  useEffect(() => {
    updateChanges();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    changes,
    updateChanges,
  };
};

export { useValuesChanges };
