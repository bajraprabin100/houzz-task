import _ from 'lodash';
import React, { Dispatch } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { DropdownItemProps } from 'react-bootstrap/esm/DropdownItem';
import { FeatureGuard } from '../components/multi-tenant/FeatureGuard';
import { AnyType } from '../interfaces';
import { AppRootState, navigateToTenancyLink } from '../redux';

export const featureGridColumnsSelector = (featureKey: string) => (state: AppRootState) =>
  (((state.app?.entities?.features as AnyType) ?? {})[featureKey ?? ''] as AnyType)?.data?.columns;

export const getFeatureGridColumnProps = ({ headerName, hide }: AnyType = {}) => ({ headerName, hide });

export const renderTenancyLinksAsNavItems = (dispatch: Dispatch<AnyType>, links: AnyType) => {
  return links?.map((link: AnyType) => renderTenancyNavItem(dispatch, link));
};

export const renderTenancyNavItem = (
  dispatch: Dispatch<AnyType>,
  link: AnyType,
  navItemProps: DropdownItemProps = {}
) => {
  const kebabLabel = _.kebabCase(link.label);

  return (
    <FeatureGuard key={kebabLabel} contentKey={link.featureKey}>
      <NavDropdown.Item
        {...navItemProps}
        data-testid={`cmx__${kebabLabel}`}
        eventKey={kebabLabel}
        onClick={() => dispatch(navigateToTenancyLink(link))}>
        <NavDropdown.ItemText>{link.label}</NavDropdown.ItemText>
      </NavDropdown.Item>
    </FeatureGuard>
  );
};
