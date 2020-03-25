import React, { Component } from 'react';
import {
  Container,
  Segment,
  Rail,
  Sticky,
  Statistic,
  Icon,
} from 'semantic-ui-react';

class StickyStatistics extends Component {
  render() {
    return (
      <Container>
        <Segment style={{ backgroundColor: '#252839' }}>
          <Rail position="right">
            <Sticky>
              <Segment textAlign="center">
                <Statistic.Group>
                  <Statistic>
                    <Statistic.Value>
                      <Icon name="usb" /> {this.props.microbitsConnected}
                    </Statistic.Value>
                    <Statistic.Label>Microbits Connected</Statistic.Label>
                  </Statistic>
                </Statistic.Group>
              </Segment>
            </Sticky>
          </Rail>
        </Segment>
      </Container>
    );
  }
}

export default StickyStatistics;
