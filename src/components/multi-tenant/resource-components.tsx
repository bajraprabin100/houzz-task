import React, { Props } from 'react';
import { AuthLayoutHeader, PublicLayout } from '..';
import { AnyType } from '../../interfaces';
import { rawCleanHtmlProps } from '../../utils';

interface ResourceContentProps extends Props<JSX.Element> {
  contentKey: string | string[];
  defaultContent?: AnyType;
  sourceDataKey?: string;
  render?: (data: AnyType) => JSX.Element;
}
