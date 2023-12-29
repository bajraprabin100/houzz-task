import React, { PropsWithChildren } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { LoadingIndicatorRow, PublicLayout } from '.';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UiLoadingProps extends PropsWithChildren<unknown> {}

export const UiLoading = (props: UiLoadingProps) => {
  return (
    <PublicLayout fluid>
      <Container className='view-container'>
        <Row>
          <Col className='text-center'>
            <LoadingIndicatorRow />
            {props.children}
          </Col>
        </Row>
      </Container>
    </PublicLayout>
  );
};
