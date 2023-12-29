import { OktaAuth } from '@okta/okta-auth-js';
import { RouterState } from 'connected-react-router';
import { PortalFeature, PortalMenu, PortalResource, Drug, Drugs } from '../../api/portal-config.generated';
import { ActionItem, AnyType, OktaConfig, SelectOption } from '../../interfaces';

export type PortalContentTypes = PortalFeature | PortalMenu[] | PortalResource | Drug[] | undefined;

export interface ActionItemState {
  action_items: ActionItem[];
}

export interface AppState {
  entities: {
    features?: { [key: string]: PortalFeature };
    featuresByDrug?: { [key: number]: { [key: string]: PortalFeature } };
    drugs?: { number: Drugs };
    drugList?: Drug[];
    menus?: { [key: string]: PortalMenu };
    resources?: { [key: string]: PortalResource };
  };
  states: SelectOption[];
  suffix: SelectOption[];
}

export interface AuthUser extends AnyType {
  sub?: string;
  name?: string;
  locale?: string;
  email?: string;
  preferred_username?: string;
  Login?: string;
  given_name?: string;
  family_name?: string;
  zoneinfo?: string;
  updated_at?: number;
  email_verified?: boolean;
  UserRole?: string;
}

export interface AuthSession extends AnyType {
  isAuthenticated?: boolean;
  error?: string;
  user?: AuthUser;
}

export interface AuthState {
  authError?: string;
  configError?: string;
  oktaConfig?: OktaConfig;
  session?: AuthSession;
  oktaAuth?: OktaAuth;
  isAdmin?: boolean;
}

export interface MessagesState {
  unreadMessagesCount: number | null;
  error?: AnyType;
}

export interface AppRootState {
  app: AppState;
  auth: AuthState;
  messages: MessagesState;
  router: RouterState;
  transaction: AnyType;
}
