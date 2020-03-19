import React, {Component} from 'react';
import {Icon, Button} from 'semantic-ui-react';

class PlayButton extends Component {
  render () {
    return this.props.isRunning
      ? <Button
          icon
          labelPosition="left"
          onClick={this.props.onClick}
          color="red"
        >
          <Icon name="pause" />
          Pause
        </Button>
      : <Button
          icon
          labelPosition="left"
          onClick={this.props.onClick}
          color="green"
          style={{width: '115.28px'}}
        >
          <Icon name="play" />
          Play
        </Button>;
  }
}

export default PlayButton;
