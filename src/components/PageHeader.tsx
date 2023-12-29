import React from 'react';
import { Container } from 'react-bootstrap';

import { connect } from 'react-redux';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PageHeaderProps {
  pageTitle: string;
}

export const PageHeader = ({ pageTitle }: PageHeaderProps) => {
  return (
    <div className='bg-light-gray border border-bottom border-secondary'>
      <Container>
        <div className='d-flex py-3 w-45'>
          <h3 className='font-weight-bold'>{pageTitle}</h3>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export const ConnectedPageHeader = connect(mapStateToProps, mapDispatchToProps)(PageHeader);
