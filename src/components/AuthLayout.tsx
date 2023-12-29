import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
interface AuthLayoutProps {
  image?: string | null;
}

export class AuthLayout extends Component<AuthLayoutProps> {
  render() {
    return (
      <Container fluid>
        <Row>
          {!this.props.image && (
            <Col className='overflow-hidden p-0 authlayout_custom_image d-none d-md-block w-100 w-md-75 w-lg-50' />
          )}
          {this.props.image && (
            <Col className='overflow-hidden p-0 d-none authlayout_custom_image d-md-block w-100 w-md-75 w-lg-50'>
              Test
            </Col>
          )}

          <Col className='px-5 py-5 px-lg-5 py-lg-5 authlayout_custom_image px-md-0 py-md-0 mb-5 px-xs-0'>
            <div className='w-lg-50 mx-auto'>{this.props.children}</div>
          </Col>
        </Row>
      </Container>
    );
  }
}

interface AuthLayoutHeaderProps {
  title: string;
}

export class AuthLayoutHeader extends Component<AuthLayoutHeaderProps> {
  static displayName = 'AuthLayoutHeader';

  render() {
    return (
      <div className='text-center text-custom-50 pb-2'>
        <h3>{this.props.title}</h3>
        <h6 className='text-left'>{this.props.children}</h6>
      </div>
    );
  }
}
