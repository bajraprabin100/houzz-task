import { RowNode } from 'ag-grid-community';
import { isEmpty } from 'lodash';

import { AnyType } from '../interfaces';

// converter utils
export const enumToArray = (enumObject: AnyType): string[] => {
  const arr: string[] = [];
  for (const key in enumObject) arr.push(enumObject[key]);
  return arr;
};

export const setToArray = (set: Set<string>): string[] => Array.from(set?.values());
// End of converter utils

export enum CasesFilterTypes {
  all = 'All Cases',
  needAction = 'Action Needed',
  updated = 'Updated',
  messageReceived = 'Message Received',
  prescriptionIntake = 'Prescription Intake',
  benefitInvestigation = 'Benefit Investigation',
  priorAuthorization = 'Prior Authorization',
  appeal = 'Appeal',
  bridge = 'Bridge',
  copay = 'Copay',
  patientAssistantProgram = 'Patient Assistance Programs',
  sentToPharmacy = 'Sent to Pharmacy',
  closed = 'Include Closed Cases',
  enrollment = 'Patient Enrollment'
}

export const CasesFilterTypesArray: string[] = enumToArray(CasesFilterTypes);

// CASE fitler utils
export const casefilterGridComparator = (node: RowNode, filters: Set<string> | undefined) => {
  let showNode = false;
  if (!filters || filters?.size <= 0) showNode = showNode || !isClosedCase(node);
  else {
    if (filters?.has(CasesFilterTypes.all) || (filters?.size === 1 && filters?.has(CasesFilterTypes.closed)))
      showNode = true;
    else {
      const caseFilterArray = setToArray(filters);
      const includeCloseCaseFilter: boolean = caseFilterArray?.findIndex((f) => CasesFilterTypes.closed === f) !== -1;
      caseFilterArray?.forEach((filter) => (showNode = showNode || filterCase(node, filter, includeCloseCaseFilter)));
    }
  }
  return showNode;
};

const isClosedCase = (node: RowNode): boolean => node.data.caseClosed >= 1;

const filterCase = (node: RowNode, filter: string, includeCloseCaseFilter: boolean) => {
  let showNode = false;
  if (filter === CasesFilterTypes.needAction) showNode = node.data.needAction >= 1;
  else if (filter === CasesFilterTypes.updated) showNode = node.data.isUpdatedRecently >= 1;
  else if (filter === CasesFilterTypes.messageReceived) showNode = node.data.hasUnReadMessage >= 1;
  else if (filter === CasesFilterTypes.priorAuthorization) showNode = node.data.caseMileStone == 'PA';
  else if (filter === CasesFilterTypes.prescriptionIntake) showNode = node.data.caseMileStone == 'PIN';
  else if (filter === CasesFilterTypes.enrollment) showNode = node.data.caseMileStone == 'ENR';
  else if (filter === CasesFilterTypes.benefitInvestigation) showNode = node.data.caseMileStone == 'BI';
  else if (filter === CasesFilterTypes.appeal) showNode = node.data.caseMileStone == 'APP';
  else if (filter === CasesFilterTypes.bridge) showNode = node.data.caseMileStone == 'bridge';
  else if (filter === CasesFilterTypes.copay) showNode = node.data.caseMileStone == 'CA';
  else if (filter === CasesFilterTypes.patientAssistantProgram) showNode = node.data.caseMileStone == 'PAP';
  else if (filter === CasesFilterTypes.sentToPharmacy) showNode = node.data.caseMileStone == 'TP';
  return showNode && (!includeCloseCaseFilter ? !isClosedCase(node) : true);
};
// End of CASE fitler utils

export const extractCaseUrl = ({ hash, search }: AnyType): { hashValue: string | undefined; filters: Set<string> } => {
  const filtersString: string | undefined | null = hash
    ? decodeURI(hash)
        ?.split('?')?.[1]
        ?.split('&')
        ?.find((f) => f?.includes('filters'))
        ?.replace('filters=', '')
    : new URLSearchParams(search)?.get('filters');
  return {
    hashValue: decodeURI(hash)?.split('?')?.[0],
    filters: !isEmpty(filtersString) ? new Set<string>(filtersString?.split(',')) : new Set<string>()
  };
};
