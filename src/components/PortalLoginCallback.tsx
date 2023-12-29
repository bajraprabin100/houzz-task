import React from 'react';
import { LoginCallback } from '@okta/okta-react';
import { UiLoading } from './UiLoading';

export const PortalLoginCallback = () => {
  // TODO: Add a proper error state for the LoginCallback
  return (
    <UiLoading>
      <LoginCallback />
    </UiLoading>
  );
};
