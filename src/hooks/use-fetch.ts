import { useState, useEffect } from 'react';

import { AnyObject } from 'react-final-form';

import { UseDataHookResponse } from '../interfaces';

interface UseFetchOpts extends RequestInit {
  url: string;
  lazy?: boolean;
}

interface UseFetchResponse extends UseDataHookResponse {
  success?: boolean;
}

export const useFetch = ({ method = 'GET', ...opts }: UseFetchOpts): UseFetchResponse => {
  const [data, setData] = useState<AnyObject | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchData = async (fetchOpts?: UseFetchOpts) => {
    try {
      setLoading(true);
      const response = await fetch(opts.url, {
        ...opts,
        body: fetchOpts?.body ?? opts.body,
        method: method ?? 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Keep this after the above header(s) so users can override the default
          ...opts.headers,
          ...fetchOpts?.headers
        }
      });
      const data = (await (response as Response).json()) ?? {};
      setData(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
    setSuccess(true);
  };

  useEffect(
    () => {
      if (!opts.lazy) {
        fetchData();
      }
    },
    opts.lazy ? [opts.url, method] : []
  );

  return { loading, data, error, fetchData, success };
};
