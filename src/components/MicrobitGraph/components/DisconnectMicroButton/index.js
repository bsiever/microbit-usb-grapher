import React from 'react';
import { Button } from 'semantic-ui-react';

export function DisconnectMicroButton(props) {
  let disconnectMicro = () => {
    props.disconnectDevice(props.device);
  };

  return (
    <Button size="big" onClick={(e) => disconnectMicro()}>
      Disconnect Device
    </Button>
  );
}

export default DisconnectMicroButton;
