import { useCallback, useEffect } from 'react';

export interface SessionTracker {
  // A toggle to turn on or off the tracker
  isActive: boolean;
  // A handler called when a session warning is reset after user activity
  onReset?: () => void;
  // A handler called when the `sessionTimeout` time has been reached
  onSessionTimeout: () => void;
  // A handler called when the `warningTimeout` time has been reached
  onWarn: () => void;
  // The max time the user can be idle before the session is closed
  sessionTimeout?: number;
  // The time the user can be idle before a warning shows
  warningTimeout?: number;
}

export const useSessionTracker = ({
  isActive = false,
  sessionTimeout,
  warningTimeout,
  onReset,
  onSessionTimeout,
  onWarn
}: SessionTracker) => {
  const timedOut = useCallback(() => {
    onSessionTimeout && onSessionTimeout();
  }, [onSessionTimeout]);

  const reset = useCallback(() => {
    onReset && onReset();
  }, [onReset]);

  const warn = useCallback(() => {
    onWarn && onWarn();
  }, [onWarn]);

  useEffect(() => {
    let warningTimer: number;
    let sessionTimer: number;

    const clearTimeouts = () => {
      if (warningTimer) clearTimeout(warningTimer);
      if (sessionTimer) clearTimeout(sessionTimer);
    };

    const setTimeouts = () => {
      warningTimer = window.setTimeout(warn, warningTimeout);
      sessionTimer = window.setTimeout(timedOut, sessionTimeout);
    };

    const resetTimeout = () => {
      clearTimeouts();
      setTimeouts();
      reset();
    };

    if (!isActive) {
      clearTimeouts();
      return;
    }

    const events = ['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress'];

    events.forEach((event) => {
      window.removeEventListener(event, resetTimeout);
      window.addEventListener(event, resetTimeout);
    });

    setTimeouts();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimeout);
        clearTimeouts();
      });
    };
  }, [isActive, timedOut, reset, sessionTimeout, warn, warningTimeout]);
};
