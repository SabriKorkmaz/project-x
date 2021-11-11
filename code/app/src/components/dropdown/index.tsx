import * as React from "react";
import Select from "react-select";
import styles from "./style.module.css";
import { IDropdownProps, IDropdownState, IDropdownItem } from "./interface";
export default class Dropdown extends React.Component<
  IDropdownProps,
  IDropdownState
> {
  constructor(props: IDropdownProps) {
    super(props);
  }
  handleChange = (selected: IDropdownItem): void => {
    if (this.props.handleChange) {
      this.props.handleChange(selected)
    }
  };
  handleInputChange = (inputValue: any): void => {
    if (this.props.handleInputChange) {
      this.props.handleInputChange(this.state.text);
    }
  };
  render() {
    return (
      <div className={styles.dropDownHolder}>
        <div>
          <h4>{this.props.label}</h4>
        </div>
        <Select
          options={this.props.items}
          onInputChange={this.handleInputChange}
          value={this.props.value as any}
          onChange={this.handleChange as any}
        />
      </div>
    );
  }
}
