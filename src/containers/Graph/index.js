import React, { Component } from 'react';
import { Container, Table, Divider, Statistic, Icon } from 'semantic-ui-react';
import PlayButton from '../../components/PlayButton';
import SaveDataButton from '../../components/SaveData';
import DisconnectMicroButton from '../../components/DisconnectMicroButton';
import { BrushChart } from '../../components/BrushChart';
import moment from 'moment';
import Title from '../../components/Title';

class MicrobitGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      csvData: [],
    };
    this.setSeconds = this.setSeconds.bind(this);
    this.setCSVData = this.setCSVData.bind(this);
  }

  setSeconds(seconds) {
    this.setState({
      seconds: seconds,
    });
  }

  setCSVData(csvData) {
    var updatedData = csvData.map(function(val, index) {
      return { key: index + 1, value: val };
    });

    this.setState({
      csvData: updatedData,
    });
  }

  render() {
    return (
      <div>
        <Container>
          <Title
            title={this.props.title}
            handleSubmit={this.props.handleSubmit}
          />
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
                    csvData={this.state.csvData}
                    fileName={'microbit-usb-data-' + moment().format('MM-DD')}
                  />

                  <Divider hidden />

                  <DisconnectMicroButton
                    device={this.props.device}
                    disconnectDevice={this.props.disconnectDevice.bind(this)}
                  />

                  <Statistic size="mini" style={{}}>
                    <Statistic.Value>
                      <Icon name="clock outline" /> {this.state.seconds}
                    </Statistic.Value>
                    <Statistic.Label>Time Elapsed</Statistic.Label>
                  </Statistic>
                </Table.Cell>
                <Table.Cell>
                  <BrushChart
                    series={this.props.series}
                    runRealtimeData={this.props.isRunning}
                    setCSVData={this.setCSVData}
                    setSeconds={this.setSeconds}
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
