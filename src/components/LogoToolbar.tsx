import React from 'react';
import { Image, Container } from 'react-bootstrap';
import { ROUTE_PATHS } from '../utils';
import { Link } from 'react-router-dom';
export const LogoToolbar = () => {
  return (
    <Container fluid className='cmx__logo-toolbar'>
      <Container className='d-flex justify-content-center justify-content-md-start'>
        <Link to={ROUTE_PATHS.login}>Test</Link>
      </Container>
    </Container>
  );
};
