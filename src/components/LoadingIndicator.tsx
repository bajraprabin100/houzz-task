import React, { PropsWithChildren } from 'react';
import { Col, Row, Spinner, SpinnerProps } from 'react-bootstrap';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface LoadingIndicatorProps extends PropsWithChildren<unknown> {
  spinnerProps?: Partial<SpinnerProps>;
  isMedEbvAutomationEnabled?: boolean;
  loadingService?: string;
  message?: string;
}

export const LoadingIndicator = (props: LoadingIndicatorProps) => {
  if (props.isMedEbvAutomationEnabled) {
    let displayMessage = 'Processing';
    switch (props?.loadingService?.toLowerCase()) {
      default:
        displayMessage = props?.message ?? 'Processing';
    }
    return (
      <div className='loading-wrapper'>
        <p className='loading-text'> {displayMessage} </p>
        <div>
          <div className='snippet' data-title='.dot-floating'>
            <div className='stage'>
              <div className='dot-floating' />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <Spinner {...props.spinnerProps} animation='border' role='status' data-testid='cmx__loading-indicator'>
      <span className='sr-only'>{props.children}</span>
    </Spinner>
  );
};

export const LoadingIndicatorRow = (props: LoadingIndicatorProps) => {
  return (
    <Row>
      <Col className='text-center'>
        <LoadingIndicator {...props} />
      </Col>
    </Row>
  );
};
