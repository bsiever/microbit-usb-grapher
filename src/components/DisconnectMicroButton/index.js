import React, { Component } from 'react';
import { Button, Confirm } from 'semantic-ui-react';

export class DisconnectMicroButton extends Component {
  disconnectMicro = () => {
    this.props.disconnectDevice(this.props.device);
  };

  state = { open: false };

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <Button size="big" onClick={this.open}>
          Disconnect Device
        </Button>
        <Confirm
          header="Confirm Disconnecting Micro:bit"
          content="Are you sure you want to disconnect this Micro:bit device?"
          confirmButton="Yes"
          open={this.state.open}
          onCancel={this.close}
          onConfirm={(e) => {
            this.disconnectMicro();
            this.close();
          }}
        />
      </div>
    );
  }
}

export default DisconnectMicroButton;
