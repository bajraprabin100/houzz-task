import { AnyObject } from 'final-form';
import { normalize, schema } from 'normalizr';
import { AnyAction } from 'redux';
import { states, suffix } from '../../utils/data';
import { AppActionsEnum } from '../actions/app.actions';
import { AppState } from './types';

const initialState: AppState = {
  entities: {},
  states,
  suffix
};

const entityDataToJson = (entity: AnyObject) => {
  try {
    return { ...entity, data: JSON.parse(entity.data) };
  } catch (error) {
    return entity;
  }
};

// This prefixes the feature key by the `drugId` field to force uniqueness
const getFeatureIdAttribute = (entity: AnyObject) => {
  return entity.drugId ? `${entity.drugId}.${entity.key}` : entity.key;
};

const featureSchema = new schema.Entity(
  'features',
  {},
  { idAttribute: getFeatureIdAttribute, processStrategy: entityDataToJson }
);
const menuSchema = new schema.Entity('menus', {}, { idAttribute: 'key', processStrategy: entityDataToJson });
const resourceSchema = new schema.Entity('resources', {}, { idAttribute: 'key', processStrategy: entityDataToJson });
const serviceSchema = new schema.Entity('services', {}, { idAttribute: 'name', processStrategy: entityDataToJson });
const drugsSchema = new schema.Entity('drugs', {}, { idAttribute: 'DrugId', processStrategy: entityDataToJson });

const getFeatures = (action: AnyAction) => {
  const features = normalize(action.payload, [featureSchema]).entities.features ?? {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const featuresByDrug = Object.keys(features).reduce((accumulator: any, key) => {
    const feature = features[key];

    if (feature.drugId) {
      // Remove the drug id prefix so the feature keys stay
      const druglessKey = key.replace(`${feature.drugId}.`, '');

      accumulator[feature.drugId] = {
        ...(accumulator[feature.drugId] ?? {}),
        [druglessKey]: feature
      };
    }

    return accumulator;
  }, {});

  return { features, featuresByDrug };
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case AppActionsEnum.CACHE_APP_CONFIG:
      return { ...state, config: action.payload };
    case AppActionsEnum.CACHE_FEATURES:
      return {
        ...state,
        // TODO: Fix these to consolidate the `entities` and `results`
        entities: { ...state.entities, ...getFeatures(action) }
      };
    case AppActionsEnum.CACHE_MENUS:
      return {
        ...state,
        entities: { ...state.entities, menus: normalize(action.payload, [menuSchema]).entities.menus }
      };
    case AppActionsEnum.CACHE_RESOURCES:
      return {
        ...state,
        entities: { ...state.entities, resources: normalize(action.payload, [resourceSchema]).entities.resources }
      };
    case AppActionsEnum.CACHE_SERVICE:
      return {
        ...state,
        entities: { ...state.entities, services: normalize(action.payload, [serviceSchema]).entities.services }
      };
    case AppActionsEnum.CACHE_DRUGS:
      // eslint-disable-next-line no-case-declarations
      const drugs = normalize(action.payload ?? {}, [drugsSchema]).entities.drugs ?? {};
      return {
        ...state,
        entities: { ...state.entities, drugs, drugList: Object.values(drugs) }
      };
    default:
      return state;
  }
};
