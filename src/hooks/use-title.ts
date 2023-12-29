import { useEffect } from 'react';

export const useTitle = (title: string, includePrefix = true) => {
  const prefix = 'Standard Portal - ';
  const pageTitle = `${includePrefix ? prefix : ''}${title}`;
  useEffect(() => {
    const prevTitle = document.title;
    document.title = pageTitle;
    return () => {
      document.title = prevTitle;
    };
  }, [title, includePrefix]);
};
