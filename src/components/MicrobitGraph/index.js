import React, { Component } from 'react';
import {
  Container,
  Table,
  Divider,
  Header,
  Statistic,
  Icon,
} from 'semantic-ui-react';
import PlayButton from './components/PlayButton';
import SaveDataButton from './components/SaveData';
import DisconnectMicroButton from './components/DisconnectMicroButton';
import BrushChart from './components/BrushChart';
import moment from 'moment';
import Title from './components/Title';

class MicrobitGraph extends Component {
  render() {
    return (
      <div>
        <Container>
          <Title title={this.props.title} />
          <Table definition textAlign="center">
            <Table.Body>
              <Table.Row>
                <Table.Cell width={2} verticalAlign="top">
                  <PlayButton
                    isRunning={this.props.isRunning}
                    onClick={this.props.playOnClick}
                  />

                  <Divider hidden />

                  <SaveDataButton
                    csvData={this.props.csvData}
                    fileName={'microbit-usb-data-' + moment().format('MM-DD')}
                  />

                  <DisconnectMicroButton disconnectDevice={this.props.disconnectDevice} />
              
                  <Statistic
                    size="mini"
                    style={{
                    
                    }}
                  >
                    <Statistic.Value>
                      <Icon name="clock outline" /> 0
                    </Statistic.Value>
                    <Statistic.Label>Time Elapsed</Statistic.Label>
                  </Statistic>
                  
                </Table.Cell>
                <Table.Cell>
                  <BrushChart
                    options={this.props.options}
                    series={this.props.series}
                    optionsLine={this.props.optionsLine}
                    seriesLine={this.props.seriesLine}
                    height={this.props.height}
                    areaHeight={this.props.areaHeight}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>

        <Divider hidden />
      </div>
    );
  }
}

export default MicrobitGraph;
