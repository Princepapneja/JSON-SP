import * as React from 'react';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import styles from './ColorSwatch.module.scss';
import * as strings from 'ListRepresentationWebPartStrings';

export interface IColorSwatchProps {
  color: string;
  onColorChanged(color: any): void;
  onColorDeleted(): void;
}

export interface IColorSwatchState {
  picking: boolean;
}

export default class ColorSwatch extends React.Component<IColorSwatchProps, IColorSwatchState> {
  private pickBtn = React.createRef<any>();

  constructor(props: IColorSwatchProps) {
    super(props);

    // Bind methods
    this.pick = this.pick.bind(this);

    // Default state
    this.state = {
      picking: false,
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <button className={styles.colorSwatch} style={{ backgroundColor: this.props.color }} onClick={this.pick} ref={this.pickBtn}>{this.props.color}</button>

        <Callout hidden={!this.state.picking} target={this.pickBtn.current} onDismiss={this.pick} directionalHint={DirectionalHint.leftTopEdge}>
          <ColorPicker color={this.props.color} onChange={this.props.onColorChanged as any} />
          <footer className={styles.swatchActions}>
            <DefaultButton text={strings.DeleteColor} iconProps={{ iconName: 'Delete' }} onClick={this.props.onColorDeleted} />
          </footer>
        </Callout>
      </div>
    );
  }

  public pick(): void {
    this.setState({
      picking: !this.state.picking,
    });
  }
}
