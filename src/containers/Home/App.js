import React, { createRef } from 'react';
import '../../styles/App.css';
import { Container, Divider, Button } from 'semantic-ui-react';
import { Header, Icon } from 'semantic-ui-react';
import { SideNav } from '../../components/SideNav';
import { AddMicroButton } from '../../components/AddMicroButton';
import { uBitDisconnect } from '../../utils/microbit-api';
import MicrobitGraph from '../../components/MicrobitGraph';
import StickyStatistics from '../../components/StickyStatistics';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // mirco connections
      devices: {},
      isRunning: false,
      microbitsConnected: 3,
      graphs: [
        {
          title: 'Test1',
          isRunning: false,
          timeElapsed: 0,
          series: [
            {
              data: ['100', '200', '400'],
            },
          ],
        },
        {
          title: 'Test2',
          isRunning: false,
          timeElapsed: 0,
          series: [
            {
              data: ['100', '200', '400'],
            },
          ],
        },
        {
          title: 'Test3',
          isRunning: false,
          timeElapsed: 0,
          series: [
            {
              data: ['100', '200', '400'],
            },
          ],
        },
      ],
      options: {
        chart: {
          id: 'chart2',
          type: 'line',
          height: 230,
          toolbar: {
            autoSelected: 'pan',
            show: false,
          },
        },
        colors: ['#546E7A'],
        stroke: {
          width: 3,
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 1,
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: 'date',
          categories: [],
        },
      },

      seriesLine: [
        {
          data: [
            '2019-11-30T08:17:24.220Z',
            '2019-12-30T08:17:24.220Z',
            '2020-1-30T08:17:24.220Z',
          ],
        },
      ],
      optionsLine: {
        chart: {
          id: 'chart1',
          height: 130,
          type: 'area',
          brush: {
            target: 'chart2',
            enabled: true,
          },
          selection: {
            enabled: true,
          },
        },
        colors: ['#008FFB'],
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 0.91,
            opacityTo: 0.1,
          },
        },
        xaxis: {
          type: 'date',
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          tickAmount: 2,
        },
      },
      seconds: 0,
    };

    this.coolCallBack = this.coolCallBack.bind(this);
  }

  coolCallBack(type, device, data) {
    if (type === 'connected') {
      let devices = this.state.devices;
      devices[device.productName] = device;
      this.setState({ devices: devices });
    }
  }

  disconnectDevice(device) {
    uBitDisconnect(device);
    let devices = this.state.devices;
    delete devices[device.productName];
    this.setState({ devices: devices });
  }

  contextRef = createRef();

  render() {
    var arr = [2, 5, 6, 3, 8, 9];

    var csvData = arr.map(function(val, index) {
      return { key: index, value: val * val };
    });

    let disconnectButtons = Object.keys(
      this.state.devices
    ).map((deviceName) => (
      <Button
        onClick={this.disconnectDevice.bind(
          this,
          this.state.devices[deviceName]
        )}
      >
        Disconnect Device: {deviceName}{' '}
      </Button>
    ));

    return (
      <div>
        <Header as="h2" icon inverted textAlign="center">
          <Icon name="line graph" />
          Micro: bit USB Grapher{' '}
          <Header.Subheader>
            Collect and graph data on one or more Micro: bits!
          </Header.Subheader>{' '}
        </Header>{' '}
        <Divider />
        <StickyStatistics
          microbitsConnected={this.state.microbitsConnected}
          timeElapsed={this.state.timeElapsed}
        />
        <Container>
          <AddMicroButton onAddComplete={this.coolCallBack} />{' '}
          {disconnectButtons}{' '}
          {this.state.graphs.map((g, index) => {
            return (
              <div>
                <MicrobitGraph
                  title={g.title}
                  csvData={csvData}
                  options={this.state.options}
                  series={g.series}
                  optionsLine={this.state.optionsLine}
                  seriesLine={this.state.seriesLine}
                  height={this.state.height}
                  areaHeight={this.state.areaHeight}
                  isRunning={g.isRunning}
                  playOnClick={() => {
                    let updatedGraphs = JSON.parse(
                      JSON.stringify(this.state.graphs)
                    );
                    updatedGraphs[index].isRunning = g.isRunning ? false : true;
                    this.setState({
                      graphs: updatedGraphs,
                    });
                  }}
                />{' '}
              </div>
            );
          })}{' '}
        </Container>{' '}
      </div>
    );
  }
}

export default App;
