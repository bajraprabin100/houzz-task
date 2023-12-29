/* Generated by restful-react */

import React from 'react';
import { Get, GetProps, useGet, UseGetProps } from 'restful-react';
export interface PortalFeature {
  portalFeatureId?: number;
  key?: string;
  data?: string;
  isCustom?: boolean;
}

export interface Error {
  code?: string;
  description?: string;
}

export interface OktaInfo {
  authurl?: string;
  clientId?: string;
}

export interface PortalFeatures {
  portalFeatures?: PortalFeature[];
  errors?: Error[];
}

export interface BeerDetails {
  id?: string;
  name?: string;
  tagline?: string;
  first_brewed?: string;
  description?: string;
  image_url?: string;
  abv?: string;
  ibu?: string;
  target_fg?: string;
  target_og?: string;
  ebc?: string;
  srm?: string;
  ph?: string;
  attenuation_level?: string;
  volume?: string;
  clientLogo?: any;
  boil_volume?: any;
  method?: any;
  ingredients?: any;
  food_pairing?: string;
  brewer_tips?: string;
}

export interface PortalResource {
  portalResourceId?: number;
  key?: string;
  data?: string;
  isCustom?: boolean;
}

export interface PortalResources {
  portalResources?: PortalResource[];
  errors?: Error[];
}

export interface PortalMenu {
  portalMenuId?: string;
  key?: string;
  data?: string;
  isCustom?: boolean;
}

export interface PortalMenus {
  portalMenus?: PortalMenu[];
  errors?: Error[];
}

export interface ServiceEntity {
  entityId?: string;
  description?: string;
  isActive?: string;
  sequence?: string;
  key?: string;
  data?: string;
  isEnabled?: string;
  isCustom?: string;
}
export interface Drug {
  DrugId?: number;
  DrugBrandName?: string;
  DrugGenericName?: string;
  DrugLabelName?: string;
  Manufacturer?: string;
  DrugDescription?: string;
  DrugNDC?: string;
  JCode1?: string;
  Jcode2?: string;
  Quantity?: string;
  DaysSupply?: string;
}

export interface Drugs {
  ClientDrugs?: Drug[];
  errors?: Error[];
}

export interface GetPortalConfigurationHcpQueryParams {
  url?: string;
}

export interface GetBeersQueryParams {
  page?: number;
  per_page?: number;
}
export type UseGetBeerProps = Omit<UseGetProps<Array<BeerDetails>, unknown, GetBeersQueryParams, void>, 'path'>;

export const useGetBeers = (props: UseGetBeerProps) =>
  useGet<Array<BeerDetails>, unknown, GetBeersQueryParams, void>(`/v2/beers`, props);
