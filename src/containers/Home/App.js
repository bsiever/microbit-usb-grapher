import React, { createRef } from 'react';
import '../../styles/App.css';
import { Container, Divider } from 'semantic-ui-react';
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
      microbitsConnected: 0,
      graphs: [],
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

    this.microbitCallBack = this.microbitCallBack.bind(this);
  }

  microbitCallBack(type, device, data) {
    if (type === 'connected') {
      let devices = this.state.devices;
      devices[device.serialNumber] = device;
      this.createGraph(device);
    }
    else if (type === "graph-data") {
      let deviceGraphs = Object.assign(this.state.graphs)
      if (deviceGraphs[device.serialNumber].series.data === undefined) {
        // WHY IS THIS A STRING!!!!
        deviceGraphs[device.serialNumber].series.data = [data.data] 
      }
      else {
        deviceGraphs[device.serialNumber].series.data.push(data.data)
      }
      this.setState({
        graphs: deviceGraphs 
      })
    }
  }

  disconnectDevice(device) {
    uBitDisconnect(device);
    let devices = this.state.devices;
    let graphs = this.state.graphs;
    delete devices[device.serialNumber];
    delete graphs[device.serialNumber];
    this.setState({
      graphs: graphs,
      devices: devices,
      microbitsConnected: this.state.microbitsConnected - 1,
    });
  }

  createGraph(device) {
    if (this.state.graphs[device.serialNumber] === undefined) {
      let graphs = this.state.graphs;
      graphs[device.serialNumber] = {
        deviceSerial: device.serialNumber,
        title: 'Micro:bit Graph ' + device.vendorId,
        isRunning: false,
        timeElapsed: 0,
        series: [
          {
            data: new Array(),
          },
        ],
      };
      this.setState({
        graphs: graphs,
        microbitsConnected: this.state.microbitsConnected + 1,
      });
    }
  }

  contextRef = createRef();

  render() {
    var arr = [2, 5, 6, 3, 8, 9];

    var csvData = arr.map(function(val, index) {
      return { key: index, value: val * val };
    });

    const graphs = this.state.graphs;

    return (
      <div>
        <Header as="h2" icon inverted textAlign="center">
          <Icon name="line graph" />
          Micro: bit USB Grapher
          <Header.Subheader>
            Collect and graph data on one or more Micro: bits!
          </Header.Subheader>
        </Header>
        <Divider />
        <StickyStatistics
          microbitsConnected={this.state.microbitsConnected}
          timeElapsed={this.state.timeElapsed}
        />
        <Container>
          <AddMicroButton onAddComplete={this.microbitCallBack} />
          {graphs &&
            Object.keys(graphs).map((key, index) => {
              return (
                <div>
                  <MicrobitGraph
                    device={this.state.devices[key]}
                    title={graphs[key].title}
                    csvData={csvData}
                    options={this.state.options}
                    series={graphs[key].series}
                    optionsLine={this.state.optionsLine}
                    seriesLine={this.state.seriesLine}
                    height={this.state.height}
                    areaHeight={this.state.areaHeight}
                    isRunning={graphs[key].isRunning}
                    playOnClick={() => {
                      let updatedGraphs = Object.assign(this.state.graphs)
                      updatedGraphs[key].isRunning = graphs[key].isRunning
                        ? false
                        : true;
                      this.setState({
                        graphs: graphs,
                      });
                    }}
                    disconnectDevice={this.disconnectDevice.bind(this)}
                  />
                </div>
              );
            })}
        </Container>
      </div>
    );
  }
}

export default App;
