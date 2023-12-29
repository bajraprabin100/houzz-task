import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { ChevronRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../interfaces';
interface BreadcrumbToolbarProps {
  breadcrumbs?: Breadcrumb[];
}

export const BreadcrumbToolbar = ({ breadcrumbs }: BreadcrumbToolbarProps) => {
  const breadcrumbsLength = Number(breadcrumbs && breadcrumbs?.length);
  const renderBreadcrumb = (breadcrumb: Breadcrumb) => {
    if (!breadcrumb.href && !breadcrumb.onClick) return <span>{breadcrumb.label}</span>;

    const testId = breadcrumb.testId ? `cmx__breadcrumb__${breadcrumb.testId}` : null;

    return breadcrumb.onClick ? (
      <Button
        className='text-white fs-1 font-weight-normal p-0 border-0 pl-1 pr-1'
        data-testid={testId}
        onClick={breadcrumb.onClick}
        variant='link'>
        {breadcrumb.label}
      </Button>
    ) : (
      <Link to={breadcrumb.href ?? ''} className='text-white pl-1 pr-1'>
        {breadcrumb.label}
      </Link>
    );
  };

  return (
    <Container fluid className='bg-secondary border-bottom border-secondary'>
      <Container>
        {breadcrumbs?.map((breadcrumb, i: number) => {
          return (
            <span key={i} className='text-white text-uppercase fs-1 d-inline-flex align-items-center'>
              {renderBreadcrumb(breadcrumb)}{' '}
              {breadcrumbsLength > 1 && breadcrumbsLength !== i ? <ChevronRight /> : null}{' '}
            </span>
          );
        })}
      </Container>
    </Container>
  );
};
