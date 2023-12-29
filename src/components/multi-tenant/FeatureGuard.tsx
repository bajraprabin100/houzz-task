import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { AnyType } from '../../interfaces';
import { AppRootState } from '../../redux';

interface FeatureProps extends PropsWithChildren<unknown> {
  contentKey?: string;
  disabledHandler?: () => JSX.Element | AnyType;
}

export const FeatureGuard = ({ disabledHandler = () => <></>, ...props }: FeatureProps) => {
  const enabled = useSelector(
    (state: AppRootState) =>
      (((state.app?.entities?.features as AnyType) ?? {})[props.contentKey ?? ''] as AnyType)?.data?.enabled
  );

  if (enabled === true || !props.contentKey) {
    return <>{props.children}</>;
  }

  if (enabled === null || enabled === undefined) {
    return null;
  }

  return disabledHandler() || null;
};
