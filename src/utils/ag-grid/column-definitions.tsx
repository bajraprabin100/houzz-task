import { ColDef, RowNode, ValueSetterParams } from 'ag-grid-community';
import moment from 'moment';
import {
  ActionColumnActions,
  carrierValueGetter,
  gridDateFormatter,
  messageDateFormatter,
  physicianNameValueFormatter,
  providerNameValueFormatter,
  stringToNumberValueGetter,
  trackingValueGetter,
  patientHubStatusValueFormatter,
  dobDateFormatter,
  amountValueFormatter
} from '.';
import { AnyType } from '../../interfaces';

export const globalDefaultColDefs: ColDef = {
  sortable: true,
  filter: true,
  resizable: true,
  autoHeight: true
};

// -----===[ColDefs]===-----

export const actionsColumnDefinition = (actions: (node: RowNode) => ActionColumnActions[]): ColDef => ({
  cellEditor: 'ActionsCellEditor',
  cellEditorParams: {
    cellRenderer: 'ActionsCellRenderer',
    values: actions
  },
  cellRenderer: 'ActionsCellRenderer',
  editable: true,
  filter: false,
  headerName: 'ACTIONS',
  maxWidth: 85,
  resizable: false,
  singleClickEdit: true,
  sortable: false,
  suppressSizeToFit: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  valueSetter: (params: ValueSetterParams) => false
});

export const alertColumnDefinition = (cellRenderer = 'AlertCellRenderer'): ColDef => ({
  cellRenderer: cellRenderer,
  filter: false,
  headerName: '',
  maxWidth: 75,
  resizable: false,
  sortable: false,
  suppressSizeToFit: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  valueSetter: (params: ValueSetterParams) => false
});

export const nameColumnDefinition = ({ headerName, hide }: AnyType = {}) => ({
  headerName,
  hide,
  comparator: customComparator
});
export const customComparator = (valueA: string, valueB: string) => {
  return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
};

export const messageDirectionColumnDefinition = (headerName = ''): ColDef => ({
  headerName,
  cellRenderer: 'MessageCellRenderer',
  suppressAutoSize: true,
  suppressSizeToFit: true,
  maxWidth: 40
});

export const messageColumnDefinition = (headerName = 'MESSAGE DETAIL'): ColDef => ({
  headerName,
  field: 'messageText',
  wrapText: true,
  autoHeight: true,
  suppressAutoSize: true,
  suppressSizeToFit: true,
  tooltipField: 'messageText'
});

export const prescriberColumnDefinition = (headerName = 'PRESCRIBER'): ColDef => ({
  field: 'physicianFirstName',
  filterValueGetter: physicianNameValueFormatter,
  headerName: headerName,
  valueFormatter: physicianNameValueFormatter,
  valueGetter: physicianNameValueFormatter,
  width: 215
});

export const patientHubStatusColumnDefinition = (field: string, headerName?: string): ColDef => ({
  headerName,
  field,
  valueGetter: patientHubStatusValueFormatter,
  width: 250
});

export const carrierColumnDefinition = (headerName = 'CARRIER'): ColDef => ({
  field: 'shippingCarrier',
  filterValueGetter: carrierValueGetter,
  headerName: headerName,
  valueFormatter: carrierValueGetter,
  valueGetter: carrierValueGetter
});
export const trackingColumnDefinition = (headerName = 'TRACKING'): ColDef => ({
  field: 'trackingNumber',
  filterValueGetter: trackingValueGetter,
  headerName: headerName,
  valueFormatter: trackingValueGetter,
  valueGetter: trackingValueGetter
});

export const providerColumnDefinition = (headerName = 'provider'): ColDef => ({
  field: 'providerFirstName',
  filterValueGetter: providerNameValueFormatter,
  headerName: headerName,
  valueFormatter: providerNameValueFormatter,
  valueGetter: providerNameValueFormatter
});
export const serviceRequestAlertColumnDefinition = (): ColDef =>
  alertColumnDefinition('ServiceRequestAlertCellRenderer');

export const caseAlertColumnDefinition = (): ColDef => alertColumnDefinition('CaseAlertCellRenderer');

export const viewActionColumnDefinition = (headerName = 'ACTIONS'): ColDef => ({
  headerName,
  cellRenderer: 'ViewDocumentRenderer',
  filter: false,
  maxWidth: 85,
  resizable: false,
  sortable: false,
  suppressSizeToFit: true
});

export const dobDateColumnFormat = (field: string, headerName?: string): ColDef => ({
  headerName,
  field,
  filter: 'agDateColumnFilter',
  tooltipValueGetter: (params) => params.value,
  valueGetter: dobDateFormatter({ key: field }),
  filterParams: {
    ...dateFilterParams
  }
});

export const dateColumnDefinition = (field: string, headerName?: string): ColDef => ({
  headerName,
  field,
  filter: 'agDateColumnFilter',
  tooltipValueGetter: (params) => params.value,
  valueGetter: gridDateFormatter({ key: field }),
  filterParams: {
    ...dateFilterParams
  }
});

export const messageDateColumnDefinition = (field: string, headerName?: string): ColDef => ({
  headerName,
  field,
  filter: 'agDateColumnFilter',
  tooltipValueGetter: (params) => params.value,
  valueGetter: messageDateFormatter({ key: field }),
  filterParams: {
    ...dateFilterParams
  }
});

export const drugDescription = (field: string, headerName?: string): ColDef => ({
  headerName,
  field,
  tooltipField: field,
  cellClass: 'ellipse-renderer'
});

export const idColumnDefinition = (field: string, headerName?: string): ColDef => ({
  headerName,
  field,
  filter: 'agNumberColumnFilter',
  tooltipField: field,
  valueGetter: stringToNumberValueGetter
});

export const amountColumnDefinition = (field: string): ColDef => ({
  field,
  tooltipValueGetter: (params) => params.value,
  valueGetter: amountValueFormatter
});

export const dateColumnDefinitionWithTime = (field: string, headerName?: string): ColDef => ({
  headerName,
  field,
  filter: 'agDateColumnFilter',
  tooltipValueGetter: (params) => params.value,
  valueGetter: gridDateFormatter({ key: field, format: 'MM/DD/YYYY hh:mm A' }),
  filterParams: {
    ...dateFilterParams
  }
});

// -----===[Filter Params]===-----

export const dateFilterParams = {
  comparator(filterLocaleDate: Date, cellValue: string) {
    if (cellValue === null) return 0;

    const cellDate = moment(cellValue).utc();
    const filterDate = moment(filterLocaleDate).utc();

    return cellDate.isBefore(filterDate) ? -1 : cellDate.isAfter(filterDate) ? 1 : 0;
  }
};
