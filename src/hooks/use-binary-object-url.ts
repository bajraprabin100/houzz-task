import { useMemo } from 'react';

export const useBinaryObjectUrl = (
  base64EncodedBinaryString: string | undefined | null,
  type: string,
  defaultValue?: string
): string | undefined =>
  useMemo(() => {
    // Chrome is unable to directly show certain files as pure base64-encoded entities, so we convert to a binary blob.
    // This might be attributed to known chrome bug(s):
    //   - https://bugs.chromium.org/p/chromium/issues/detail?id=1054978
    //   - https://bugs.chromium.org/p/chromium/issues/detail?id=477866

    // Useful for a placeholder if base64 string is retrieved asynchronously:
    if (!base64EncodedBinaryString) return defaultValue;

    const binary = atob(base64EncodedBinaryString);
    const contents = new Uint8Array(binary.length).map((_, index) => binary.charCodeAt(index));
    const blob = new Blob([contents], { type });
    return URL.createObjectURL(blob);
  }, [base64EncodedBinaryString, type, defaultValue]);
