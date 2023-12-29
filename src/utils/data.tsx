import React from 'react';

import { standardPortalConfig } from './constants';
import { ROUTE_PATHS } from '../utils';
import { useParams } from 'react-router-dom';
import { AppRootState } from '../redux';
import { useSelector } from 'react-redux';
import PopoverStickOnHover from './PopoverStickOnHover';

const insuranceProvidersData = {
  medicare_part_b: 'Medicare Part B (Medical)',
  medicare_part_d: 'Medicare Part D (Prescription)',
  medicare_advantage: 'Medicare Advantage',
  medicaid: 'Medicaid',
  military: 'VA/Military',
  private: 'Commercial/Private Insurance',
  other: 'Other'
};

const languageData = {
  English: 'English',
  Spanish: 'Spanish',
  Other: 'Other'
};

const primaryDiagnosisCodesData = {
  'e78.0': 'E78.0 Pure Hypercholesterolemia (including HeFH)',
  'e78.2': 'E78.2 Mixed Hyperlipidemia',
  'e78.4': 'E78.4 Other Hyperlipidemia',
  'e78.5': 'E78.5 Hyperlipidemia, Unspecified',
  other: 'Other'
};

const secondaryDiagnosisCodesData = {
  'E78.70': 'E78.70 Disorder of bile acid and cholesterol metabolism, unspecified',
  'E78.71': 'E78.71 Barth syndrome',
  'E78.72': 'E78.72 Smith-Lemli-Opitz syndrome',
  'E78.79': 'E78.79 Other disorders of bile acid and cholesterol metabolism',
  other: 'Other'
};
const tertiaryDiagnosisCodesData = {
  'E78.81': 'E78.81 Lipoid dermatoarthritis',
  'E78.9': 'E78.9 Disorder of lipoprotein metabolism, unspecified',
  'E78.01': 'E78.01 Familial hypercholesterolemia',
  'E78.79': 'E78.79 Other disorders of bile acid and cholesterol metabolism',
  other: 'Other'
};
const ndcCodesData = {
  '00078100060': '078100060-Inclisiran',
  '70114010112': '70114010112-Generica',
  '61755000502': '61755000502-Regeneron',
  '64842102501': '64842102501-Lonsurf',
  '64842072709': '64842072709-Inqovi'
};
const qualityUnitOfMeasureData = {
  EA: 'EA-Each',
  GM: 'Grams',
  ML: 'Milliliters'
};
const relationshipData = {
  Spouse: 'Spouse',
  Father: 'Father',
  Mother: 'Mother',
  Brother: 'Brother',
  Sister: 'Sister',
  Daughter: 'Daughter',
  Son: 'Son',
  'Grand Parent': 'Grand Parent',
  'Grand Child': 'Grand Child',
  Friend: 'Friend',
  Other: 'Other'
};

const cardHolderRelationshipData = {
  Spouse: 'Spouse',
  'Grandson or Grand Daughter': 'Grandson or Granddaughter',
  'Adopted Child': 'Adopted Child',
  'Stepson or Stepdaughter': 'Stepson or Stepdaughter',
  Child: 'Child',
  'Ex-spouse': 'Ex-spouse',
  'Life Partner': 'Life Partner',
  Self: 'Self'
};

const cardHolderRelationshipDataTahio = {
  Self: 'Self',
  Child: 'Child',
  Spouse: 'Spouse',
  Other: 'Other'
};

const supplimentPlanLetterData = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  F: 'F',
  G: 'G',
  K: 'K',
  L: 'L',
  M: 'M',
  N: 'N'
};

const statesData = {
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FM: 'Federated States Of Micronesia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming'
};

const suffixData = {
  jr: 'Jr',
  sr: 'Sr',
  i: 'I',
  ii: 'II',
  iii: 'III',
  iv: 'IV',
  v: 'V',
  md: 'MD',
  dds: 'DDS',
  phd: 'PhD',
  dvm: 'DVM'
};

const placeOfServiceData = {
  default: {
    '11': 'Office',
    '22': 'On Campus Out Patient Hospital'
  },
  regeneron: {
    '11': "Physician's office",
    '22': 'Hospital Outpatient',
    '22-1': 'Ambulatory Surgical Center' // '22' -> for POS code and '-*' to reuse same code
  }
};

const cptCodeData = {
  96372: 'Therapeutic',
  20610: 'Arthrocentesis',
  52287: 'Cystourethroscopy',
  64614: 'Chemodenervation',
  96366: 'Prophylactic',
  96365: 'Prophylaxis',
  67028: 'Under Vitreous Procedures'
};

export const verricaCptCode = formatToArray({
  17110: 'CPT 17110',
  17111: 'CPT 17111'
});

export const insuranceProviders = formatToArray(insuranceProvidersData);
export const languages = formatToArray(languageData);
export const primaryDiagnosisCodes = formatToArray(primaryDiagnosisCodesData);
export const tertiaryDiagnosisCodes = formatToArray(tertiaryDiagnosisCodesData);
export const secondaryDiagnosisCodes = formatToArray(secondaryDiagnosisCodesData);
export const ndcCodes = formatToArray(ndcCodesData).filter((code) =>
  standardPortalConfig.isStandardPortalUrl ? code.value === '70114010112' : code.value === '00078100060'
);
export const productName = standardPortalConfig.isStandardPortalUrl ? 'Generica' : 'Inclisiran';
export const productNameType = (appName: string) => {
  switch (appName) {
    case 'novartisproviderportal':
      return 'Inclisiran';
    case 'biopharmaproviderportal':
      return 'Generica';
    case 'RegeneronProviderPortal':
      return 'Eylea';
    default:
      return 'Generica';
  }
};
export const relationships = formatToArray(relationshipData);
export const states = formatToArray(statesData);
export const suffix = formatToArray(suffixData);
export const placeOfService = (portal_name?: string) =>
  formatToArray(portal_name === 'RegeneronProviderPortal' ? placeOfServiceData.regeneron : placeOfServiceData.default);
export const cptCodes = formatToArray(cptCodeData);
export const supplimentPlanLetter = formatToArray(supplimentPlanLetterData);
export const cardholderRelationship = formatToArray(cardHolderRelationshipData);
export const cardHolderRelationshipTahio = formatToArray(cardHolderRelationshipDataTahio);

export const drugDescriptionType = (appName: string) => {
  const { drug } = useParams<{ drug: string }>();
  const drugList = useSelector((state: AppRootState) => state.app?.entities?.drugList) ?? null;
  const drugDetails = drug ? drugList?.filter((d) => d?.DrugId === Number(drug) && d.DrugId) : drugList;
  const drugArray = {
    portalDrug: drugDetails?.[0]?.DrugLabelName ?? 'NoDrug'
  };
  const regenronDrugType = {
    Eylea: drugDetails?.[0]?.DrugLabelName ?? 'Eylea',
    'Vial(s) NDC: 61755-005-02': 'Vial(s) NDC: 61755-005-02',
    'PFS(s) NDC: 61755-005-01': 'PFS(s) NDC: 61755-005-01'
  };
  switch (appName) {
    case 'RegeneronProviderPortal':
      return formatToArray(regenronDrugType);
    default:
      return formatToArray(drugArray);
  }
};

export const qualityUnitOfMeasure = formatToArray(qualityUnitOfMeasureData);

export function formatToArray(entries: {
  [key: string]: string;
}): {
  label: string;
  value: string;
}[] {
  return Object.entries(entries).map((entry: string[]) => ({ label: entry[1], value: entry[0] }));
}

const regeneronDiagnosisCodesData = {
  'E08.311': 'Diabetes mellitus due to underlying condition with unspecified diabetic retinopathy with macular edema',
  'E08.319':
    'Diabetes mellitus due to underlying condition with unspecified diabetic retinopathy without macular edema',
  'E08.3211':
    'Diabetes mellitus due to underlying condition with mild nonproliferative diabetic retinopathy with macular edema, right eye',
  'E08.3212':
    'Diabetes mellitus due to underlying condition with mild nonproliferative diabetic retinopathy with macular edema, left eye',
  'E08.3213':
    'Diabetes mellitus due to underlying condition with mild nonproliferative diabetic retinopathy with macular edema, bilateral',
  'E08.3219':
    'Diabetes mellitus due to underlying condition with mild nonproliferative diabetic retinopathy with macular edema, unspecified eye',
  'E08.3291':
    'Diabetes mellitus due to underlying condition with mild nonproliferative diabetic retinopathy without macular edema, right eye',
  'E08.3292':
    'Diabetes mellitus due to underlying condition with mild nonproliferative diabetic retinopathy without macular edema, left eye',
  'E08.3293':
    'Diabetes mellitus due to underlying condition with mild nonproliferative diabetic retinopathy without macular edema, bilateral',
  'E08.3299':
    'Diabetes mellitus due to underlying condition with mild nonproliferative diabetic retinopathy without macular edema, unspecified eye',
  'E08.3311':
    'Diabetes mellitus due to underlying condition with moderate nonproliferative diabetic retinopathy with macular edema, right eye',
  'E08.3312':
    'Diabetes mellitus due to underlying condition with moderate nonproliferative diabetic retinopathy with macular edema, left eye',
  'E08.3313':
    'Diabetes mellitus due to underlying condition with moderate nonproliferative diabetic retinopathy with macular edema, bilateral',
  'E08.3319':
    'Diabetes mellitus due to underlying condition with moderate nonproliferative diabetic retinopathy with macular edema, unspecified eye',
  'E08.3391':
    'Diabetes mellitus due to underlying condition with moderate nonproliferative diabetic retinopathy without macular edema, right eye',
  'E08.3392':
    'Diabetes mellitus due to underlying condition with moderate nonproliferative diabetic retinopathy without macular edema, left eye',
  'E08.3393':
    'Diabetes mellitus due to underlying condition with moderate nonproliferative diabetic retinopathy without macular edema, bilateral',
  'E08.3399':
    'Diabetes mellitus due to underlying condition with moderate nonproliferative diabetic retinopathy without macular edema, unspecified eye',
  'E08.3411':
    'Diabetes mellitus due to underlying condition with severe nonproliferative diabetic retinopathy with macular edema, right eye',
  'E08.3412':
    'Diabetes mellitus due to underlying condition with severe nonproliferative diabetic retinopathy with macular edema, left eye',
  'E08.3413':
    'Diabetes mellitus due to underlying condition with severe nonproliferative diabetic retinopathy with macular edema, bilateral',
  'E08.3419':
    'Diabetes mellitus due to underlying condition with severe nonproliferative diabetic retinopathy with macular edema, unspecified eye',
  'E08.3491':
    'Diabetes mellitus due to underlying condition with severe nonproliferative diabetic retinopathy without macular edema, right eye',
  'E08.3492':
    'Diabetes mellitus due to underlying condition with severe nonproliferative diabetic retinopathy without macular edema, left eye',
  'E08.3493':
    'Diabetes mellitus due to underlying condition with severe nonproliferative diabetic retinopathy without macular edema, bilateral',
  'E08.3499':
    'Diabetes mellitus due to underlying condition with severe nonproliferative diabetic retinopathy without macular edema, unspecified eye',
  'E08.3511':
    'Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with macular edema, right eye',
  'E08.3512':
    'Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with macular edema, left eye',
  'E08.3513':
    'Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with macular edema, bilateral',
  'E08.3519':
    'Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy with macular edema, unspecified eye',
  'E08.3591':
    'Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy without macular edema, right eye',
  'E08.3592':
    'Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy without macular edema, left eye',
  'E08.3593':
    'Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy without macular edema, bilateral',
  'E08.3599':
    'Diabetes mellitus due to underlying condition with proliferative diabetic retinopathy without macular edema, unspecified eye',
  'E09.311': 'Drug or chemical induced diabetes mellitus with unspecified diabetic retinopathy with macular edema',
  'E09.319': 'Drug or chemical induced diabetes mellitus with unspecified diabetic retinopathy without macular edema',
  'E09.3211':
    'Drug or chemical induced diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema, right eye',
  'E09.3212':
    'Drug or chemical induced diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema, left eye',
  'E09.3213':
    'Drug or chemical induced diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema, bilateral',
  'E09.3219':
    'Drug or chemical induced diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema, unspecified eye',
  'E09.3291':
    'Drug or chemical induced diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema, right eye',
  'E09.3292':
    'Drug or chemical induced diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema, left eye',
  'E09.3293':
    'Drug or chemical induced diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema, bilateral',
  'E09.3299':
    'Drug or chemical induced diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema, unspecified eye',
  'E09.3311':
    'Drug or chemical induced diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema, right eye',
  'E09.3312':
    'Drug or chemical induced diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema, left eye',
  'E09.3313':
    'Drug or chemical induced diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema, bilateral',
  'E09.3319':
    'Drug or chemical induced diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema, unspecified eye',
  'E09.3391':
    'Drug or chemical induced diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema, right eye',
  'E09.3392':
    'Drug or chemical induced diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema, left eye',
  'E09.3393':
    'Drug or chemical induced diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema, bilateral',
  'E09.3399':
    'Drug or chemical induced diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema, unspecified eye',
  'E09.3411':
    'Drug or chemical induced diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema, right eye',
  'E09.3412':
    'Drug or chemical induced diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema, left eye',
  'E09.3413':
    'Drug or chemical induced diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema, bilateral',
  'E09.3419':
    'Drug or chemical induced diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema, unspecified eye',
  'E09.3491':
    'Drug or chemical induced diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema, right eye',
  'E09.3492':
    'Drug or chemical induced diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema, left eye',
  'E09.3493':
    'Drug or chemical induced diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema, bilateral',
  'E09.3499':
    'Drug or chemical induced diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema, unspecified eye',
  'E09.3511':
    'Drug or chemical induced diabetes mellitus with proliferative diabetic retinopathy with macular edema, right eye',
  'E09.3512':
    'Drug or chemical induced diabetes mellitus with proliferative diabetic retinopathy with macular edema, left eye',
  'E09.3513':
    'Drug or chemical induced diabetes mellitus with proliferative diabetic retinopathy with macular edema, bilateral',
  'E09.3519':
    'Drug or chemical induced diabetes mellitus with proliferative diabetic retinopathy with macular edema, unspecified eye',
  'E09.3591':
    'Drug or chemical induced diabetes mellitus with proliferative diabetic retinopathy without macular edema, right eye',
  'E09.3592':
    'Drug or chemical induced diabetes mellitus with proliferative diabetic retinopathy without macular edema, left eye',
  'E09.3593':
    'Drug or chemical induced diabetes mellitus with proliferative diabetic retinopathy without macular edema, bilateral',
  'E09.3599':
    'Drug or chemical induced diabetes mellitus with proliferative diabetic retinopathy without macular edema, unspecified eye',
  'E10.311': 'Type 1 diabetes mellitus with unspecified diabetic retinopathy with macular edema',
  'E10.319': 'Type 1 diabetes mellitus with unspecified diabetic retinopathy without macular edema',
  'E10.3211': 'Type 1 diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema, right eye',
  'E10.3212': 'Type 1 diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema, left eye',
  'E10.3213': 'Type 1 diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema, bilateral',
  'E10.3219':
    'Type 1 diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema, unspecified eye',
  'E10.3291':
    'Type 1 diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema, right eye',
  'E10.3292':
    'Type 1 diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema, left eye',
  'E10.3293':
    'Type 1 diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema, bilateral',
  'E10.3299':
    'Type 1 diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema, unspecified eye',
  'E10.3311':
    'Type 1 diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema, right eye',
  'E10.3312':
    'Type 1 diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema, left eye',
  'E10.3313':
    'Type 1 diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema, bilateral',
  'E10.3319':
    'Type 1 diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema, unspecified eye',
  'E10.3391':
    'Type 1 diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema, right eye',
  'E10.3392':
    'Type 1 diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema, left eye',
  'E10.3393':
    'Type 1 diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema, bilateral',
  'E10.3399':
    'Type 1 diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema, unspecified eye',
  'E10.3411':
    'Type 1 diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema, right eye',
  'E10.3412': 'Type 1 diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema, left eye',
  'E10.3413':
    'Type 1 diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema, bilateral',
  'E10.3419':
    'Type 1 diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema, unspecified eye',
  'E10.3491':
    'Type 1 diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema, right eye',
  'E10.3492':
    'Type 1 diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema, left eye',
  'E10.3493':
    'Type 1 diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema, bilateral',
  'E10.3499':
    'Type 1 diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema, unspecified eye',
  'E10.3511': 'Type 1 diabetes mellitus with proliferative diabetic retinopathy with macular edema, right eye',
  'E10.3512': 'Type 1 diabetes mellitus with proliferative diabetic retinopathy with macular edema, left eye',
  'E10.3513': 'Type 1 diabetes mellitus with proliferative diabetic retinopathy with macular edema, bilateral',
  'E10.3519': 'Type 1 diabetes mellitus with proliferative diabetic retinopathy with macular edema, unspecified eye',
  'E10.3591': 'Type 1 diabetes mellitus with proliferative diabetic retinopathy without macular edema, right eye',
  'E10.3592': 'Type 1 diabetes mellitus with proliferative diabetic retinopathy without macular edema, left eye',
  'E10.3593': 'Type 1 diabetes mellitus with proliferative diabetic retinopathy without macular edema, bilateral',
  'E10.3599': 'Type 1 diabetes mellitus with proliferative diabetic retinopathy without macular edema, unspecified eye',
  'E11.311': 'Type 2 diabetes mellitus with unspecified diabetic retinopathy with macular edema',
  'E11.319': 'Type 2 diabetes mellitus with unspecified diabetic retinopathy without macular edema',
  'E11.3211': 'Type 2 diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema, right eye',
  'E11.3212': 'Type 2 diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema, left eye',
  'E11.3213': 'Type 2 diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema, bilateral',
  'E11.3219':
    'Type 2 diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema, unspecified eye',
  'E11.3291':
    'Type 2 diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema, right eye',
  'E11.3292':
    'Type 2 diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema, left eye',
  'E11.3293':
    'Type 2 diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema, bilateral',
  'E11.3299':
    'Type 2 diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema, unspecified eye',
  'E11.3311':
    'Type 2 diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema, right eye',
  'E11.3312':
    'Type 2 diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema, left eye',
  'E11.3313':
    'Type 2 diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema, bilateral',
  'E11.3319':
    'Type 2 diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema, unspecified eye',
  'E11.3391':
    'Type 2 diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema, right eye',
  'E11.3392':
    'Type 2 diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema, left eye',
  'E11.3393':
    'Type 2 diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema, bilateral',
  'E11.3399':
    'Type 2 diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema, unspecified eye',
  'E11.3411':
    'Type 2 diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema, right eye',
  'E11.3412': 'Type 2 diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema, left eye',
  'E11.3413':
    'Type 2 diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema, bilateral',
  'E11.3419':
    'Type 2 diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema, unspecified eye',
  'E11.3491':
    'Type 2 diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema, right eye',
  'E11.3492':
    'Type 2 diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema, left eye',
  'E11.3493':
    'Type 2 diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema, bilateral',
  'E11.3499':
    'Type 2 diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema, unspecified eye',
  'E11.3511': 'Type 2 diabetes mellitus with proliferative diabetic retinopathy with macular edema, right eye',
  'E11.3512': 'Type 2 diabetes mellitus with proliferative diabetic retinopathy with macular edema, left eye',
  'E11.3513': 'Type 2 diabetes mellitus with proliferative diabetic retinopathy with macular edema, bilateral',
  'E11.3519': 'Type 2 diabetes mellitus with proliferative diabetic retinopathy with macular edema, unspecified eye',
  'E11.3551': 'Type 2 diabetes mellitus with stable proliferative diabetic retinopathy, right eye',
  'E11.3552': 'Type 2 diabetes mellitus with stable proliferative diabetic retinopathy, left eye',
  'E11.3553': 'Type 2 diabetes mellitus with stable proliferative diabetic retinopathy, bilateral',
  'E11.3559': 'Type 2 diabetes mellitus with stable proliferative diabetic retinopathy, unspecified eye',
  'E11.3591': 'Type 2 diabetes mellitus with proliferative diabetic retinopathy without macular edema, right eye',
  'E11.3592': 'Type 2 diabetes mellitus with proliferative diabetic retinopathy without macular edema, left eye',
  'E11.3593': 'Type 2 diabetes mellitus with proliferative diabetic retinopathy without macular edema, bilateral',
  'E11.3599': 'Type 2 diabetes mellitus with proliferative diabetic retinopathy without macular edema, unspecified eye',
  'E13.311': 'Other specified diabetes mellitus with unspecified diabetic retinopathy with macular edema',
  'E13.319': 'Other specified diabetes mellitus with unspecified diabetic retinopathy without macular edema',
  'E13.3211':
    'Other specified diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema, right eye',
  'E13.3212':
    'Other specified diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema, left eye',
  'E13.3213':
    'Other specified diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema, bilateral',
  'E13.3219':
    'Other specified diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema, unspecified eye',
  'E13.3291':
    'Other specified diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema, right eye',
  'E13.3292':
    'Other specified diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema, left eye',
  'E13.3293':
    'Other specified diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema, bilateral',
  'E13.3299':
    'Other specified diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema, unspecified eye',
  'E13.3311':
    'Other specified diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema, right eye',
  'E13.3312':
    'Other specified diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema, left eye',
  'E13.3313':
    'Other specified diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema, bilateral',
  'E13.3319':
    'Other specified diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema, unspecified eye',
  'E13.3391':
    'Other specified diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema, right eye',
  'E13.3392':
    'Other specified diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema, left eye',
  'E13.3393':
    'Other specified diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema, bilateral',
  'E13.3399':
    'Other specified diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema, unspecified eye',
  'E13.3411':
    'Other specified diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema, right eye',
  'E13.3412':
    'Other specified diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema, left eye',
  'E13.3413':
    'Other specified diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema, bilateral',
  'E13.3419':
    'Other specified diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema, unspecified eye',
  'E13.3491':
    'Other specified diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema, right eye',
  'E13.3492':
    'Other specified diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema, left eye',
  'E13.3493':
    'Other specified diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema, bilateral',
  'E13.3499':
    'Other specified diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema, unspecified eye',
  'E13.3511': 'Other specified diabetes mellitus with proliferative diabetic retinopathy with macular edema, right eye',
  'E13.3512': 'Other specified diabetes mellitus with proliferative diabetic retinopathy with macular edema, left eye',
  'E13.3513': 'Other specified diabetes mellitus with proliferative diabetic retinopathy with macular edema, bilateral',
  'E13.3519':
    'Other specified diabetes mellitus with proliferative diabetic retinopathy with macular edema, unspecified eye',
  'E13.3591':
    'Other specified diabetes mellitus with proliferative diabetic retinopathy without macular edema, right eye',
  'E13.3592':
    'Other specified diabetes mellitus with proliferative diabetic retinopathy without macular edema, left eye',
  'E13.3593':
    'Other specified diabetes mellitus with proliferative diabetic retinopathy without macular edema, bilateral',
  'E13.3599':
    'Other specified diabetes mellitus with proliferative diabetic retinopathy without macular edema, unspecified eye',
  'H34.8110': 'Central retinal vein occlusion, right eye, with macular edema',
  'H34.8120': 'Central retinal vein occlusion, left eye, with macular edema',
  'H34.8130': 'Central retinal vein occlusion, bilateral, with macular edema',
  'H34.8190': 'Central retinal vein occlusion, unspecified eye, with macular edema',
  'H34.8310': 'Tributary (branch) retinal vein occlusion, right eye, with macular edema',
  'H34.8320': 'Tributary (branch) retinal vein occlusion, left eye, with macular edema',
  'H34.8330': 'Tributary (branch) retinal vein occlusion, bilateral, with macular edema',
  'H34.8390': 'Tributary (branch) retinal vein occlusion, unspecified eye, with macular edema',
  'H35.3210': 'Exudative age-related macular degeneration, right eye, stage unspecified',
  'H35.3211': 'Exudative age-related macular degeneration, right eye, with active choroidal neovascularization',
  'H35.3212': 'Exudative age-related macular degeneration, right eye, with inactive choroidal neovascularization',
  'H35.3213': 'Exudative age-related macular degeneration, right eye, with inactive scar',
  'H35.3220': 'Exudative age-related macular degeneration, left eye, stage unspecified',
  'H35.3221': 'Exudative age-related macular degeneration, left eye, with active choroidal neovascularization',
  'H35.3222': 'Exudative age-related macular degeneration, left eye, with inactive choroidal neovascularization',
  'H35.3223': 'Exudative age-related macular degeneration, left eye, with inactive scar',
  'H35.3230': 'Exudative age-related macular degeneration, bilateral, stage unspecified',
  'H35.3231': 'Exudative age-related macular degeneration, bilateral, with active choroidal neovascularization',
  'H35.3232': 'Exudative age-related macular degeneration, bilateral, with inactive choroidal neovascularization',
  'H35.3233': 'Exudative age-related macular degeneration, bilateral, with inactive scar',
  'H35.3290': 'Exudative age-related macular degeneration, unspecified eye, stage unspecified',
  'H35.3291': 'Exudative age-related macular degeneration, unspecified eye, with active choroidal neovascularization',
  'H35.3292': 'Exudative age-related macular degeneration, unspecified eye, with inactive choroidal neovascularization',
  'H35.3293': 'Exudative age-related macular degeneration, unspecified eye, with inactive scar'
};
export const regeneronDiagnosisCodes = formatRegenDiagnosisCodesToArray(regeneronDiagnosisCodesData);

function formatRegenDiagnosisCodesToArray(entries: {
  [key: string]: string;
}): {
  label: string;
  value: string;
  description: string;
}[] {
  return Object.entries(entries).map((entry: string[]) => ({
    label: entry[0],
    value: entry[0],
    description: entry[1]
  }));
}
