import { render, fireEvent } from '@testing-library/react';
import { noop } from 'lodash';
import React from 'react';

import { SessionTracker, useSessionTracker } from '.';

const SESSION_TRACKER_RESET_EVENTS = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress'];
const TEST_WARN_TIMEOUT = 10000;
const TEST_SESSION_TIMEOUT = TEST_WARN_TIMEOUT * 2;

jest.useFakeTimers();

describe('useSessionTracker hook', () => {
  describe.each([
    ['onWarn', 'warningTimeout', TEST_WARN_TIMEOUT],
    ['onSessionTimeout', 'sessionTimeout', TEST_SESSION_TIMEOUT]
  ])('%s callback', (callbackName: string, timeoutName: string, timeoutDuration: number) => {
    function setupTest(sessionTrackerHookPropsOverrides?: Partial<SessionTracker>) {
      const callbacks = {
        onWarn: jest.fn(),
        onSessionTimeout: jest.fn(),
        onReset: jest.fn()
      } as { [key: string]: () => void };
      const callbackToTest = callbacks[callbackName];

      const renderResult = render(
        <SessionTrackerHookTestComponent
          sessionTrackerHookProps={{ ...callbacks, ...sessionTrackerHookPropsOverrides }}
        />
      );

      return {
        callbacks,
        callbackToTest,
        renderResult
      };
    }

    test(`should not execute before the ${timeoutName} timer expires`, () => {
      const { callbackToTest } = setupTest();

      jest.advanceTimersByTime(timeoutDuration - 1);

      expect(callbackToTest).not.toHaveBeenCalled();
    });

    test('should not execute if isActive is false', () => {
      const { callbackToTest } = setupTest({ isActive: false });

      jest.advanceTimersByTime(timeoutDuration);

      expect(callbackToTest).not.toHaveBeenCalled();
    });

    test(`should execute when the ${timeoutName} timer expires`, () => {
      const { callbackToTest } = setupTest();

      jest.advanceTimersByTime(timeoutDuration);

      expect(callbackToTest).toHaveBeenCalled();
    });

    describe.each(SESSION_TRACKER_RESET_EVENTS)('after a %s event', (testEventName) => {
      test(`should reset the ${timeoutName} timer`, () => {
        const { callbackToTest } = setupTest();

        jest.advanceTimersByTime(timeoutDuration / 2);
        emitTestEvent(testEventName);
        jest.advanceTimersByTime(timeoutDuration / 2);

        expect(callbackToTest).not.toHaveBeenCalled();
      });

      test('should execute the onReset callback', () => {
        const { callbacks } = setupTest();
        expect(callbacks.onReset).not.toHaveBeenCalled();

        emitTestEvent(testEventName);

        expect(callbacks.onReset).toHaveBeenCalled();
      });

      test(`should remove the ${testEventName} watcher if the component is unmounted`, () => {
        const { callbackToTest, renderResult } = setupTest();

        renderResult.unmount();
        jest.advanceTimersByTime(timeoutDuration);

        expect(callbackToTest).not.toHaveBeenCalled();
      });
    });
  });
});

/*
 * Private helper functions
 */

function SessionTrackerHookTestComponent({
  sessionTrackerHookProps
}: {
  sessionTrackerHookProps?: Partial<SessionTracker>;
}) {
  useSessionTracker({
    isActive: true,
    onSessionTimeout: noop,
    onWarn: noop,
    sessionTimeout: TEST_SESSION_TIMEOUT,
    warningTimeout: TEST_WARN_TIMEOUT,
    ...sessionTrackerHookProps
  });

  return <div />;
}

function emitTestEvent(eventName: string) {
  fireEvent(window, new Event(eventName));
}
