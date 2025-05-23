import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IListRepresentationProps {
  listId: string;
  selectedFields: string[];
  chartType: string;
  chartTitle: string;
  colors: string[];
  context:WebPartContext;

}
