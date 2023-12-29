import { useQueryParams } from './use-query-params';

export const useDrugFeatureKeyPrefix = () => {
  const queryParams = useQueryParams();
  const drugId = queryParams.get('drug');

  return drugId ? `${drugId}.` : '';
};
