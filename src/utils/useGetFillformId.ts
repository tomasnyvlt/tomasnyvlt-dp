import { useParams } from 'react-router-dom';

export const useGetFillformId = (): string => {
  const params = useParams<{ fillform: string }>();

  return params.fillform as string;
};
