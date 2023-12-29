import _ from 'lodash';
import React, { PropsWithChildren, ReactElement } from 'react';
import { Alert } from 'react-bootstrap';
import { AnyType } from '../interfaces';
import { LoadingIndicatorRow } from './LoadingIndicator';

interface RequestStateUIProps extends PropsWithChildren<unknown> {
  errorText?: string | ReactElement;
  errorTitle?: string;
  errorUIEnabled?: boolean;
  isError?: boolean | AnyType | undefined;
  isLoading?: boolean | AnyType | undefined;
  loadingText?: string;
  loadingUIEnabled?: boolean;
  reload?: () => void;
  reloadButtonText?: string;
  reloadingEnabled?: boolean;
  isMedEbvAutomationEnabled?: boolean;
  loadingService?: string;
}

const triggerReloadThrottleDelay = 1000;

export const RequestStateUI = (props: RequestStateUIProps) => {
  if (props.loadingUIEnabled && props.isLoading) {
    return (
      <LoadingIndicatorRow
        isMedEbvAutomationEnabled={props.isMedEbvAutomationEnabled}
        loadingService={props.loadingService}>
        {props?.loadingText ?? 'Loading'}...
      </LoadingIndicatorRow>
    );
  }

  if (props.errorUIEnabled && props.isError) {
    return <RequestError {...props} />;
  }

  return <>{props.children}</>;
};

export const RequestError = (props: RequestStateUIProps) => {
  const triggerReload = _.throttle(() => {
    props.reload && props.reload();
  }, triggerReloadThrottleDelay);

  return (
    <Alert variant='danger'>
      {<Alert.Heading>{props.errorTitle ?? 'Data Error'}</Alert.Heading>}
      <p>{props.errorText ?? 'We were unable to load the data.'}</p>
      {props.reload && props.reloadingEnabled && (
        <>
          <hr />
          <Alert.Link onClick={triggerReload}>{props.reloadButtonText ?? 'Reload'}</Alert.Link>
        </>
      )}
    </Alert>
  );
};
