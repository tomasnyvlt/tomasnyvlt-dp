import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { x } from '@xstyled/emotion';
import { FC } from 'react';

import { SpzWithBrandType } from '@src/types';
import Skeleton from '@src/components/other/Skeleton';

const SpzWithBrand: FC<SpzWithBrandType> = ({ css, ...props }) => {
  const { input, content } = useFieldApi(props);
  const componentContent = content || input.value.content;

  return (
    <x.div
      mt={{ _: '2.5rem', sm: '2rem' }}
      p="1.5rem"
      boxShadow="formBox"
      borderRadius={100}
      {...css}
    >
      {componentContent?.manufacturer ? (
        <x.p
          fontSize="0.75rem"
          lineHeight="1rem"
          color="primary.black"
          textAlign="center"
          fontWeight={500}
        >
          {componentContent.manufacturer}
        </x.p>
      ) : (
        <x.div display="flex" justifyContent="center">
          <Skeleton skeletonProps={{ height: 12, width: 100 }} />
        </x.div>
      )}

      {componentContent?.spz && (
        <x.p
          fontSize="2rem"
          lineHeight="2.25rem"
          color="primary.greenDirectDarker"
          textAlign="center"
          fontWeight={500}
          mt="2px"
        >
          SPZ: {componentContent.spz}
        </x.p>
      )}
    </x.div>
  );
};

export default SpzWithBrand;
