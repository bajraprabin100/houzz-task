/* Generated by restful-react */

import { number } from 'prop-types';
import React from 'react';
import { Get, GetProps, useGet, UseGetProps, Mutate, MutateProps, useMutate, UseMutateProps } from 'restful-react';
export const SPEC_VERSION = 'v1';

export interface Error {
  code?: string | null;
  description?: string | null;
}

export interface DocumentModel {
  fileData?: string | null;
  fileName?: string | null;
}

export interface GetDocumentResponse {
  errors?: Error[] | null;
  document?: DocumentModel;
}

export interface UploadDocumentModel {
  serviceRequestId?: number;
  entityName?: string | null;
  documentSource?: string | null;
  createdBy?: string | null;
  documentType?: string | null;
  lookupDataListFunctionName?: string | null;
  document?: DocumentModel;
}

export interface LoginUserRequest {
  userName?: string | null;
  password?: string | null;
  applicationName?: string | null;
}

export interface OrganizationAddressRequest {
  organizationAddressId?: number | null;
  addressType?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  phone1?: string | null;
  phone1Type?: string | null;
  fax?: string | null;
  faxComments?: string | null;
  prescriberId?: number | null;
}

export interface LoginUserResponse {
  errors?: Error[] | null;
  statusCode?: number | null;
  message?: string | null;
  data?: LoginResponse;
}

export interface LoginResponse {
  expiresAt?: string | null;
  status?: string | null;
  sessionToken?: string | null;
  _Embedded?: Embedded;
  _links?: Links;
}

export interface Embedded {
  user?: UserData;
}

export interface Hints {
  allow?: string[] | null;
}

export interface LinkCancel {
  href?: string | null;
  hints?: Hints;
}

export interface Links {
  cancel?: LinkCancel;
}

export interface UserData {
  id?: string | null;
  passwordChanged?: string | null;
  profile?: UserProfile;
}

export interface UserProfile {
  login?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  locale?: string | null;
  timeZone?: string | null;
}