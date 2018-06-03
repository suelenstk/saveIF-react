import React, {Component} from 'react';
import Alert from "react-bootstrap/es/Alert";
import Button from "react-bootstrap/es/Button";


export class AlertNotification extends Component {
    render() {
        return (
            <Alert bsStyle="info" className="alert-with-icon">
                {(this.props.btnCloseEvent) ?
                    <Button
                        type="button"
                        aria-hidden="true"
                        className="close"
                        onClick={(e) => {
                        }}
                    >
                        &#x2715;
                    </Button> :
                    <Button className="close" style={{display: "none"}}/>
                }
                <span data-notify="icon" className="pe-7s-bell"/>
                <span data-notify="message">
                    {this.props.message}
                </span>
                {(this.props.btnFirstName) ?
                    <Button
                        className="btnFirstAction"
                        onClick={(e) => {
                            if (this.props.btnFirstEvent) {
                            }
                        }}
                    >
                        {this.props.btnFirstName}
                    </Button> : ""}
                {(this.props.btnSecondName) ?
                    <Button
                        className="btnSecondAction"
                        onClick={(e) => {
                            if (this.props.btnSecondEvent) {
                            }
                        }}
                    >
                        {this.props.btnSecondName}
                    </Button> : ""}
            </Alert>
        );
    }
}

export default AlertNotification;