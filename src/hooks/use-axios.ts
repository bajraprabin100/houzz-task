import { useState, useEffect } from 'react';

import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { AnyObject } from 'final-form';

import { UseDataHookResponse } from '../interfaces';

export interface UseAxiosOpts extends AxiosRequestConfig {
  lazy?: boolean;
}

export const useAxios = ({ method = 'GET', ...opts }: UseAxiosOpts): UseDataHookResponse => {
  const [data, setData] = useState<AnyObject | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios(opts?.url ?? '', {
        ...opts,
        method: method ?? 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Keep this after the above header(s) so users can override the default
          ...opts.headers
        }
      });
      const data = await (response as AxiosResponse).data;
      setData(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(
    () => {
      if (!opts.lazy) {
        fetchData();
      }
    },
    opts.lazy ? [opts.url, method] : []
  );

  return { loading, data, error, fetchData };
};
