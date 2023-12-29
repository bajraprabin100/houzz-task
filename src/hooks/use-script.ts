import { useCallback } from 'react';

export interface UseScriptProps {
  callback?: () => void;
  id: string;
  lazy?: boolean;
  src: string;
}

/**
 * A hook used to dynamically load a script into an existing script tag or a new one.
 *
 * @param {UseScriptProps} { callback, lazy, id, src }
 * @returns {((callback: () => void) => void)}
 */
export const useScript = ({ callback, lazy, id, src }: UseScriptProps): (() => void) => {
  const loadScript = useCallback(() => {
    const existingScript = document.getElementById(id);

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = src;
      script.id = id;
      document.body.appendChild(script);

      script.onload = () => {
        if (callback) callback();
      };
    }

    if (existingScript && callback) {
      callback();
    }

    // Unload the script
    return () => {
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [src, id, callback]);

  if (lazy) loadScript();

  return loadScript;
};
