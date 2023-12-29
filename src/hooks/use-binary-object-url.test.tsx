import { render } from '@testing-library/react';
import React from 'react';

import { useBinaryObjectUrl } from '.';
import { mockCreateObjectUrl } from '../utils/test-helpers/mocks/Browser-mocks';

const TEST_ID = 'binaryObjectTest';
const MOCK_RESULT = 'Mock createObjectUrl result';

describe('useBinaryObjectUrl hook', () => {
  beforeEach(() => {
    mockCreateObjectUrl(MOCK_RESULT);
  });

  test('should return the result of createObjectUrl', () => {
    const { getByTestId } = render(<BinaryObjectUrlHookTestComponent />);

    expect(getByTestId(TEST_ID).innerHTML).toBe(MOCK_RESULT);
  });

  test('should return the given default value if no binary string is provided', () => {
    const defaultValue = 'Mock default value';

    const { getByTestId } = render(<BinaryObjectUrlHookTestComponent defaultValueToForce={defaultValue} />);

    expect(getByTestId(TEST_ID).innerHTML).toBe(defaultValue);
  });
});

/*
 * Private helper functions
 */

function BinaryObjectUrlHookTestComponent({ defaultValueToForce }: { defaultValueToForce?: string }) {
  const testEncodedString = defaultValueToForce ? null : btoa(MOCK_RESULT);
  const result = useBinaryObjectUrl(testEncodedString, 'text/plain', defaultValueToForce);
  return <div data-testid={TEST_ID}>{result}</div>;
}
