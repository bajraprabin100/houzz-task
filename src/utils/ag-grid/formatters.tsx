import { ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';
import { defaultDateFormat } from '..';
import { localDateFormat, localDateTableFormat, localDateTableFormatAnother } from '../formatters';

const _formatCellNumber = (cellNumber: string) => {
  const cleaned = ('' + cellNumber).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return '';
};

export const authorizationReceivedFormatter = (params: ValueFormatterParams | ValueGetterParams) => {
  return params.data.authorizationReceived ? 'Yes' : 'No';
};

export const productNameFormatter = (params: ValueFormatterParams | ValueGetterParams) => {
  return params.data.product ? params.data.product : '';
};

export const productNameFormatterForPatientCase = (params: ValueFormatterParams | ValueGetterParams) => {
  return params.data.caseDrug ? params.data.caseDrug : '';
};

export const physicianNameValueFormatter = (params: ValueFormatterParams | ValueGetterParams) => {
  const firstName = params.data.physicianFirstName;
  const lastName = params.data.physicianLastName;
  const noNameMessage = 'No Name Available';
  const nameDisplay = `${lastName ?? 'No Last Name'}, ${firstName ?? 'No First Name'}`;

  return !firstName && !lastName ? noNameMessage : nameDisplay;
};

export const carrierValueGetter = (params: ValueFormatterParams | ValueGetterParams) => {
  const carrier = params.data.shippingCarrier;
  const noCarrierMessage = 'Information is not available';

  return carrier ? carrier : noCarrierMessage;
};
export const trackingValueGetter = (params: ValueFormatterParams | ValueGetterParams) => {
  const trackingNumber = params.data.trackingNumber;
  const notrackingMessage = 'Information is not available';

  return trackingNumber ? trackingNumber : notrackingMessage;
};

export const patientHubStatusValueFormatter = (params: ValueFormatterParams | ValueGetterParams) => {
  const patientHubStatus = params.data.statusText || 'Information is not available';
  return patientHubStatus;
};

export const providerNameValueFormatter = (params: ValueFormatterParams | ValueGetterParams) => {
  const firstName = params.data.providerFirstName;
  const lastName = params.data.providerLastName;
  const noNameMessage = 'No Name Available';
  const nameDisplay = `${lastName ?? 'No Last Name'}, ${firstName ?? 'No First Name'}`;

  return !firstName && !lastName ? noNameMessage : nameDisplay;
};

export const gridDateFormatter = (keyAndFormat: { key: string; format?: string }) => (params: ValueGetterParams) => {
  return localDateTableFormatAnother(params.data[keyAndFormat.key], keyAndFormat?.format) ?? '';
};

export const messageDateFormatter = (keyAndFormat: { key: string; format?: string }) => (params: ValueGetterParams) => {
  return defaultDateFormat(params.data[keyAndFormat.key]) ?? '';
};

export const dobDateFormatter = (keyAndFormat: { key: string; format?: string }) => (params: ValueGetterParams) => {
  return localDateFormat(params.data[keyAndFormat.key], keyAndFormat?.format) ?? '';
};

export const stringToNumberValueGetter = (params: ValueGetterParams) =>
  Number(params.data[params.colDef.field as string]);

export const patientNameValueFormatter = (params: ValueFormatterParams | ValueGetterParams) => {
  const firstName = params.data.patientFirstName;
  const lastName = params.data.patientLastName;
  const noNameMessage = 'No Name Available';
  const nameDisplay = `${lastName ?? 'No Last Name'}, ${firstName ?? 'No First Name'}`;

  return !firstName && !lastName ? noNameMessage : nameDisplay;
};

export const caseStatusValueFormatter = (params: ValueFormatterParams | ValueGetterParams) => {
  return params.data.caseClosed ? 'CLOSED' : 'OPEN';
};

export const caseMileStoneValueFormatter = (params: ValueFormatterParams | ValueGetterParams) => {
  switch (params.data.caseMileStone) {
    case 'PIN':
      return 'Prescription Intake';
      break;
    case 'BI':
      return 'Benefit Investigation';
      break;
    case 'PA':
      return 'Prior Authorization';
      break;
    case 'TP':
      return 'Prescription Triage';
      break;
    case 'ENR':
      return 'Patient Enrollment';
      break;
    default:
      return '';
  }
};

export const phoneValueFormatter = (params: ValueFormatterParams | ValueGetterParams) => {
  return params.data.cellNumber ? _formatCellNumber(params.data.cellNumber) : '';
};

export const amountValueFormatter = (params: ValueGetterParams) => {
  return params.data[params.colDef.field as string] ? `$ ${params.data[params.colDef.field as string]}` : '';
};
