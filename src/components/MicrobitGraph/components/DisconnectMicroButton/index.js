import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

export function DisconnectMicroButton(props) {
  let disconnectMicro = () => {
    
  };

  return (
    <Button size="big" onClick={(e) => disconnectMicro()}>
      <Icon name="plus" />Disconnect Device
    </Button>
  );
}

export default DisconnectMicroButton;
