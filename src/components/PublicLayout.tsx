import React, { useEffect } from 'react';

import { Container } from 'react-bootstrap';

import { Breadcrumb } from '../interfaces';
import { BreadcrumbToolbar, LogoToolbar, PageHeader } from '.';
import { scrollToTop } from '../utils';

interface PublicLayoutProps extends React.PropsWithChildren<unknown> {
  className?: string;
  fluid?: boolean;
  breadcrumbs?: Breadcrumb[];
  children: React.ReactNode;
  pageTitle?: string;
}

export const PublicLayout = ({ className, breadcrumbs, children, fluid = false, pageTitle }: PublicLayoutProps) => {
  useEffect(scrollToTop, []);

  return (
    <>
      <LogoToolbar />
      {breadcrumbs && <BreadcrumbToolbar breadcrumbs={breadcrumbs} />}
      {pageTitle && <PageHeader pageTitle={pageTitle ?? ''} />}
      <Container fluid={fluid} className={((fluid ? `p-0 ${className}` : className) ?? '').trim()}>
        {children}
      </Container>
    </>
  );
};
