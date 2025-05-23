import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Environment, Version } from '@microsoft/sp-core-library';

import { PropertyFieldMultiSelect } from '@pnp/spfx-property-controls/lib/PropertyFieldMultiSelect';
import {
  type IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'ListRepresentationWebPartStrings';
import ListRepresentation from './components/ListRepresentation';
import { IListRepresentationProps } from './components/IListRepresentationProps';
import SharePointService from '../../services/SharePoint/SharePointService';
import { PropertyPaneColorPalette } from '../../controls/PropertyPaneColorPalette/PropertyPaneColorPalette';

export interface IListRepresentationWebPartProps {
  listId: string;
  selectedFields: string[];
  chartType: string;
  chartTitle: string;
  colors: string[];
  context:WebPartContext;

}

export default class ListRepresentationWebPart extends BaseClientSideWebPart<IListRepresentationWebPartProps> {
  // private _isDarkTheme: boolean = false;
  // private _environmentMessage: string = '';
  private listOptions: IPropertyPaneDropdownOption[];
  // private listOptionsLoading: boolean = false;

  // Field options state
  private fieldOptions: IPropertyPaneDropdownOption[];
  // private fieldOptionsLoading: boolean = false;
  public render(): void {
    this.properties.listId="3147ab15-8236-4643-8afe-d51bd6f3ea4d"
    this.properties.chartType="Line"
    this.properties.selectedFields= ["Investment_Date", "field_3"];  

    const element: React.ReactElement<IListRepresentationProps> = React.createElement(
      ListRepresentation,
      {
        listId: this.properties.listId,
        selectedFields: this.properties.selectedFields,
        chartType: this.properties.chartType,
        chartTitle: this.properties.chartTitle,
        colors: this.properties.colors  || ["red","blue","green"],
        context:this.context
        // listId: this.properties.listId,
        // selectedFields: this.properties.selectedFields,
        // chartType: this.properties.chartType,
        // chartTitle: this.properties.chartTitle,
        // colors: this.properties.colors  || ["red","blue","green"],
        // context:this.context

      }
    );

    ReactDom.render(element, this.domElement);
  }
  public onInit(): Promise<void> {
    return super.onInit().then(() => {
      SharePointService.setup(this.context, Environment.type);
    });
  }

  // protected onInit(): Promise<void> {
  //   return super.onInit().then(message => {
  //     SharePointService.setup(this.context, Environment.type);

  //   });
  // }



  // private _getEnvironmentMessage(): Promise<string> {
  //   if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
  //     return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
  //       .then(context => {
  //         let environmentMessage: string = '';
  //         switch (context.app.host.name) {
  //           case 'Office': // running in Office
  //             environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
  //             break;
  //           case 'Outlook': // running in Outlook
  //             environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
  //             break;
  //           case 'Teams': // running in Teams
  //           case 'TeamsModern':
  //             environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
  //             break;
  //           default:
  //             environmentMessage = strings.UnknownEnvironment;
  //         }

  //         return environmentMessage;
  //       });
  //   }

  //   return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  // }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    // this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.ChartData,
              groupFields: [
                PropertyPaneDropdown('listId', {
                  label: strings.List,
                  options: this.listOptions,
                  // disabled: this.listOptionsLoading,
                  disabled:true,

                }),
                PropertyFieldMultiSelect('selectedFields', {
                  key: 'selectedFields',
                  label: strings.SelectedFields,
                  disabled:true,
                  options: this.fieldOptions,
                  // disabled: this.fieldOptionsLoading,
                  selectedKeys: this.properties.selectedFields,
                })
              ]
            },
            {
              groupName: strings.ChartSettings,
              groupFields: [
                PropertyPaneDropdown('chartType', {
                  label: strings.ChartType,
                  options: [
                    { key: 'Bar', text: strings.ChartBar },
                    { key: 'HorizontalBar', text: strings.ChartBarHorizontal },
                    { key: 'Line', text: strings.ChartLine },
                    { key: 'Pie', text: strings.ChartPie },
                    { key: 'Doughnut', text: strings.ChartDonut },
                  ],
                  disabled:true
                }),
                PropertyPaneTextField('chartTitle', {
                  label: strings.ChartTitle
                }),
              ],
            },
            {
              groupName: strings.ChartStyle,
              groupFields: [
                new PropertyPaneColorPalette('colors', {
                  label: strings.Colors,
                  colors: this.properties.colors,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  key: 'colors_palette',
                }),
              ],
            }
          ]
        }
      ]
    };
  }

  private getLists(): Promise<IPropertyPaneDropdownOption[]> {
    // this.listOptionsLoading = true;
    this.context.propertyPane.refresh();

    return SharePointService.getLists().then(lists => {
      // this.listOptionsLoading = false;
      this.context.propertyPane.refresh();

      return lists.value.map(list => {
        return {
          key: list.Id,
          text: list.Title,
        };
      });
    });
  }

  public getFields(): Promise<IPropertyPaneDropdownOption[]> {
    // No list selected
    // if (!this.properties.listId) return Promise.resolve();
    if (!this.properties.listId) return Promise.resolve([]);

    // this.fieldOptionsLoading = true;
    this.context.propertyPane.refresh();

    return SharePointService.getListFields(this.properties.listId)
    .then(fields => {
      // this.fieldOptionsLoading = false;
      this.context.propertyPane.refresh();

      return fields.value.map(field => {
        return {
          key: field.InternalName,
          text: `${field.Title} (${field.TypeAsString})`,
        };
      });
    }).catch((error) => {
      // this.fieldOptionsLoading = false;
      this.context.propertyPane.refresh();

      console.error('Error fetching fields:', error);
      return []; 
    });
  }

  protected onPropertyPaneConfigurationStart(): void {
    void this.getLists().then(listOptions => {
      this.listOptions = listOptions;
      this.context.propertyPane.refresh();
    }).then(() => {
      void this.getFields().then(fieldOptions => {
        this.fieldOptions = fieldOptions;
        this.context.propertyPane.refresh();
      });
    });
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
  void  super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);

    if (propertyPath === 'listId' && newValue) {
      this.properties.selectedFields = [];

   void   this.getFields().then(fieldOptions => {
        this.fieldOptions = fieldOptions;
        this.context.propertyPane.refresh();
      });
    }

    else if (propertyPath === 'colors' && newValue) {
      this.properties.colors = newValue;
      this.context.propertyPane.refresh();
      this.render();
    }
  }

}
