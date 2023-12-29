import { render } from '@testing-library/react';
import React from 'react';

import { useTitle } from '.';

const PREFIX = 'Standard Portal - ';

describe('Title hook', () => {
  test('should set the page title with prefix', () => {
    const title = getTestTitle();

    render(<TitleHookTestComponent titleHookProps={[title]} />);

    expect(document.title).toEqual(PREFIX + title);
  });

  test('should set the page title without the prefix if specified', () => {
    const title = getTestTitle();

    render(<TitleHookTestComponent titleHookProps={[title, false]} />);

    expect(document.title).toEqual(title);
  });

  test('should restore the page title if the component is unmounted', () => {
    const originalTitle = 'Test Original Title';
    document.title = originalTitle;

    const { unmount } = render(<TitleHookTestComponent titleHookProps={[getTestTitle()]} />);
    unmount();

    expect(document.title).toEqual(originalTitle);
  });
});

/*
 * Private helper functions
 */

function TitleHookTestComponent({ titleHookProps }: { titleHookProps: [string, boolean?] }) {
  useTitle(...titleHookProps);
  return <div />;
}

function getTestTitle() {
  return 'Test Title - ' + Math.random();
}
