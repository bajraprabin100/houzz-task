import { useLocation } from 'react-router-dom';

export const useQueryParams = () => {
  const { search: queryString } = useLocation();

  return new URLSearchParams(queryString);
};
