import * as React from 'react';
import type { IListRepresentationProps } from './IListRepresentationProps';
import Chart from './Chart';
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import * as strings from 'ListRepresentationWebPartStrings';

export default class ListRepresentation extends React.Component<IListRepresentationProps> {
  public render(): React.ReactElement<IListRepresentationProps> {
   
    return (
      <div>
        {this.props.listId && this.props.selectedFields.length ?
          <Chart
            listId={this.props.listId}
            selectedFields={this.props.selectedFields}
            chartType={this.props.chartType}
            chartTitle={this.props.chartTitle}
            colors={this.props.colors} /> :
          <MessageBar>{strings.Intro}</MessageBar>
        }
      </div>
    );
  }
}
