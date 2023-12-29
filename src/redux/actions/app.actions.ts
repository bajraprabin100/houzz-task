import { PortalFeatures, PortalMenus } from '../../api/portal-config.generated';
import { PortalContentTypes } from '../reducers/types';

export enum AppActionsEnum {
  CACHE_APP_CONFIG = '[App] Cache Config',
  CACHE_FEATURES = '[App] Cache Features',
  CACHE_MENUS = '[App] Cache Menus',
  CACHE_RESOURCES = '[App] Cache Resources',
  CACHE_SERVICE = '[App] Cache Service',
  CACHE_DRUGS = '[App] Cache Drugs',
  CACHE_SERVICE_ENTITY = '[App] Cache Service Entity'
}

const cacheContent = <T = PortalContentTypes>(type: string, payload: T): { type: string; payload: T } => ({
  type,
  payload
});

export const cacheAppConfig = (payload: PortalContentTypes) =>
  cacheContent<PortalContentTypes>(AppActionsEnum.CACHE_APP_CONFIG, payload);

export const cacheAppFeature = (payload: PortalFeatures) =>
  cacheContent<PortalContentTypes>(AppActionsEnum.CACHE_FEATURES, payload.portalFeatures);

export const cacheAppMenu = (payload: PortalMenus) =>
  cacheContent<PortalContentTypes>(AppActionsEnum.CACHE_MENUS, payload.portalMenus);
