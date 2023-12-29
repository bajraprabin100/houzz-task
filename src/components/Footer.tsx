import _ from 'lodash';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { AnyType } from '../interfaces';
import { AppRootState, navigateToHome, navigateToLogin } from '../redux';
import { rawHtmlProps, ROUTE_PATHS } from '../utils';

export const Footer = () => {
  const isAuthenticated = useSelector((state: AppRootState) => state.auth.session?.user !== undefined);
  const footerLinks = useSelector((state: AppRootState) => (state.app.entities?.menus as AnyType)?.footer?.data?.links);
  const isFooterLogo = useSelector(
    (state: AppRootState) => ((state.app?.entities?.resources as AnyType) ?? {})['portal-logo'] as AnyType
  );
  const isFooterText = useSelector(
    (state: AppRootState) => ((state.app?.entities?.resources as AnyType) ?? {})['footer.text'] as AnyType
  );
  const dispatch = useDispatch();

  return (
    <Container fluid className='cmx__footer' data-testid='cmx__footer'>
      <Container className='cmx__footer__container'>
        <Row />
      </Container>
      <Container className='cmx__footer__sub'>
        <Row>
          <Col md='6' lg='4' className='text-center text-md-left text-uppercase'>
            {footerLinks?.map((link: AnyType) => (
              <a
                key={_.kebabCase(link.label)}
                href={(ROUTE_PATHS as AnyType)[link.url]}
                target='_blank'
                rel='noreferrer'
                className='pr-5'>
                {link.label}
              </a>
            ))}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
