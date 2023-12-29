import { RowNode } from 'ag-grid-community';

const checkForStatus = (node: RowNode, statusText: string, strictCompare: boolean) => {
  return strictCompare
    ? node.data.statusText?.toLowerCase() === statusText.toLowerCase()
    : node.data.statusText?.toLowerCase().includes(statusText.toLowerCase());
};

export const filterRequest = (
  node: RowNode,
  selectedFilterNode: boolean,
  selectorFilterList: string,
  strictCompare: boolean
) => {
  if (!selectedFilterNode) return false;
  return checkForStatus(node, selectorFilterList, strictCompare);
};
