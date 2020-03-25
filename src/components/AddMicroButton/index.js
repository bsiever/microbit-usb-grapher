import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { uBitConnectDevice } from '../../utils/microbit-api';

/**
 * AddMicroButton
 * @param {*} props
 *  onAddComplete: callback function when the mirco is added or failed to add
 *   The call back should take at least three parameters
 *     1. type: This is the type of message sent from the micro
 *     2. device: This is an id for the device
 *     3. data: Whatever data the micro sends 
 */
export function AddMicroButton(props) {
  let connectMicro = () => {
    uBitConnectDevice(props.onAddComplete);
  };

  return (
    <Button size="big" onClick={(e) => connectMicro()}>
      <Icon name="plus" />Add Micro:bit
    </Button>
  );
}
