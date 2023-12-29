import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

interface OverbrandToolbarProps {
  withLinks?: boolean;
}

export const OverbrandToolbar = ({ withLinks = true }: OverbrandToolbarProps) => {
  return (
    <Container fluid className='cmx__overbrand' data-testid='cmx__overbrand'>
      <Container className='h-100'>
        <Row className='h-100 align-items-center flex-column flex-md-row'>
          <Col lg md={6}>
            Test
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
