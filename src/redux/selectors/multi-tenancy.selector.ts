import { AnyObject } from '@data-driven-forms/react-form-renderer';
import { memoize } from 'lodash';
import { useSelector } from 'react-redux';
import { AppRootState } from '..';
import { Drug } from '../../api/portal-config.generated';
import { AnyType } from '../../interfaces';

export const ALL_SERVICE_REQUEST_KEY = 'service-request.hub-service';
export const INDIVIDUAL_SERVICE_REQUEST_KEY = 'requests.new.individual-services';

export const tenancyFeatureSelector = memoize((key: string) => (state: AppRootState): string | AnyObject =>
  getDataIfKeySpecified(state.app.entities.features, key)
);

export const tenancyResourceSelector = memoize((key?: string) => (state: AppRootState): AnyType =>
  getDataIfKeySpecified(state.app.entities.resources, key)
);

export const tenancyDrugSelector = memoize((key?: string) => (state: AppRootState): AnyType =>
  getDataIfKeySpecified(state.app.entities.drugs, key)
);

export const tenancyDrugListSelector = (state: AppRootState): Drug[] => state.app.entities.drugList ?? [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tenancyDrugServicesSelector = memoize((drugId?: number) => (state: AppRootState): any => {
  if (!drugId) return null;

  return (state.app.entities?.featuresByDrug ?? {})[drugId] ?? {};
});

export const useTenancyDrugListSelector = (): Drug[] => useSelector(tenancyDrugListSelector);

/* Return an array of features configurations of all drug specific and non specific i.e. from features and featuresByDrug. */
export const getAllTenancyFeatureSelector = (key: string, drugID?: string): AnyType[] => {
  if (!key) return [];

  const data: AnyType[] = [];

  // get data from drug features
  const drugFetureList: AnyType = useSelector(
    (state: AppRootState) => (state.app.entities?.featuresByDrug as AnyType) ?? {}
  );
  // get data from features
  const featureData: AnyType = useSelector(
    (state: AppRootState) => (((state.app.entities?.features as AnyType) ?? {})?.[key] as AnyType)?.data
  );

  // get drug from features
  const drugs: AnyType = useSelector((state: AppRootState) => state.app.entities?.drugs as AnyType);

  const setDrugSpecificConfig = (featureConfig: AnyType) => {
    if (!featureConfig || Object.keys(featureConfig).length === 0) return;
    if (featureConfig?.drugId && featureConfig?.data && !Array.isArray(featureConfig?.data)) {
      const configData = featureConfig?.data;
      configData.drugLabelName = drugs?.[featureConfig?.drugId]?.DrugLabelName;
      data.push(configData);
    } else {
      data.push(featureConfig?.data);
    }
  };

  if (!drugID) {
    if (featureData && Object.keys(featureData).length > 0) data.push(featureData);
    for (const x in drugFetureList) {
      setDrugSpecificConfig(drugFetureList[x]?.[key] as AnyType);
    }
  } else {
    setDrugSpecificConfig(drugFetureList[drugID]?.[key] as AnyType);
  }

  return data;
};

/*
 * Private helper functions
 */

function getDataIfKeySpecified(rootData: AnyType, key: string | undefined) {
  return key ? rootData?.[key]?.data : rootData;
}
