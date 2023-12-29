import { AnyObject } from 'final-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any;

export interface ActionItem {
  type: string;
  request_id: string;
  submitted: string;
  prescriber_name: string;
  status: StatusEnum;
  next_steps: string;
}

export enum AttestationType {
  Electronic = 'electronic',
  Manual = 'manual'
}

export interface Breadcrumb {
  href?: string;
  label: string;
  onClick?: () => void;
  testId?: string;
}

export interface Document {
  name: string;
  type: string;
  product: string;
  created_date: string;
}

export interface FilePreview {
  bytes: string | ArrayBuffer | null;
  path: string;
  preview: string;
}

export interface GeneralObject {
  [key: string]: string | number | string[] | unknown[] | unknown;
}

export interface PortalSelectProps {
  [key: string]: AnyType;
  label?: string;
  name: string;
  placeholder?: string;
}
export enum AutomatedServiceOptionType {
  AUTO_MED_EBV = `auto-medebv`,
  AUTO_MED_EPA = `auto-medepa`
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface UseDataHookResponse {
  loading: boolean;
  data: AnyObject | null;
  error?: string | null;
  fetchData?: AnyType | null;
}

export interface User {
  firstName: string;
  lastName: string;
  userName: string;
  userType: string;
  email: string;
  isActive: boolean;
  isAdmin: boolean;
  created: string;
}

export interface OktaConfig {
  clientId: string;
  issuer: string;
  redirectUri: string;
  scopes: string[];
  responseType?: string[];
  pkce?: boolean;
}

export enum StatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  UNREGISTERED = 'unregistered'
}

// Multi-tenancy

export interface DashboardContentSection {
  body?: string;
  grid: DashboardContentGridItem[];
  header: string;
}
export interface DashboardContentGridItem {
  action: {
    hash?: string;
    label: string;
    pathname: string;
    target?: string;
  };
  content: string;
  subtitle?: string;
  title: string;
}
export interface DashboardContent {
  sections: DashboardContentSection[];
}

export interface PhoneNumber {
  phoneNumber: string;
  phoneType: string;
  okToLeaveMessage: boolean;
}
