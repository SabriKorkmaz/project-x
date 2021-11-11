import * as React from "react";
import { IErrorProps } from "./interface";
class Error extends React.Component<IErrorProps> {
  constructor(props: IErrorProps) {
    super(props);
  }
  render() {
    if (this.props.status) {
      return (
        <div className="alert alert-danger">
          <strong>Hata!</strong> {this.props.text}
        </div>
      );
    } else {
      return "";
    }
  }
}

export default Error;
