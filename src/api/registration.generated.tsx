/* Generated by restful-react */

import { userInfo } from 'os';
import React from 'react';
import { Mutate, MutateProps, useMutate, UseMutateProps } from 'restful-react';
export const SPEC_VERSION = '1.0';
export interface Registration {
  PracticeInfo?: {
    ProgramId?: number;
    PracticeName?: string;
    Speciality?: string;
    TaxId?: string;
    NPI?: string;
    AddressLine1?: string;
    AddressLine2?: string;
    City?: string;
    State?: string;
    Zip?: string;
    PhoneNumber?: string;
    FaxNumber?: string;
  };
  AdministratorInfo?: {
    IsPhysician?: number;
    NPI?: string;
    FirstName?: string;
    LastName?: string;
    Suffix?: string;
    PhoneNumber?: string;
    FaxNumber?: string;
    EMail?: string;
    UserName?: string;
  };
  PhysicianInfo?: {
    NPI?: string;
    FirstName?: string;
    LastName?: string;
    MiddleName?: string;
    TaxID?: string;
    StateLicenseNumber?: string;
    LicensingState?: string;
    PTAN?: string;
    DEA?: string;
    EMAIL?: string;
  };
  TermsAndConditionsAcknowledgement?: number;
  BAAAcknowledgement?: number;
  BAALanguageAcknowledgement?: number;
  BAASignatureText?: string;
  BAASignatureDate?: Date;
}
export interface RegistrationUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}
export interface RegistrationResponse {
  errors?: Error[] | null;
  data?: RegistrationUser;
}

export interface Error {
  code?: string | null;
  description?: string | null;
}

export type RegistrationProps = Omit<
  MutateProps<RegistrationResponse, void, void, Registration, void>,
  'path' | 'verb'
>;

export const Registration = (props: RegistrationProps) => (
  <Mutate<RegistrationResponse, void, void, Registration, void>
    verb='POST'
    path={`/registrations/registrations`}
    {...props}
  />
);

export type UseRegistrationProps = Omit<
  UseMutateProps<RegistrationResponse, void, void, RegistrationUser, void>,
  'path' | 'verb'
>;

export const useRegistration = (props: UseRegistrationProps) =>
  useMutate<RegistrationResponse, void, void, RegistrationUser, void>('POST', `/auth/register`, props);
