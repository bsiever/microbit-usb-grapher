import React, { createRef } from 'react';
import '../../styles/App.css';
import { Container, Menu, Button } from 'semantic-ui-react';
import { Header, Icon } from 'semantic-ui-react';
import { AddMicroButton } from '../../components/AddMicroButton';
import { uBitDisconnect } from '../../utils/microbit-api';
import MicrobitGraph from '../../components/MicrobitGraph';
import StickyStatistics from '../../components/StickyStatistics';
import HelpButton from '../../components/HelpInstructions';
import './App.css';
import hexFile from './microbit-Serial-Data-Example.hex';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // mirco connections
      devices: {},
      isRunning: false,
      microbitsConnected: 0,
      graphs: [],
      seconds: 0,
      activeTab: 'Microbit Graph 1',
    };

    this.microbitCallBack = this.microbitCallBack.bind(this);
  }

  convertLetterToNumber(str) {
    var out = 0,
      len = str.length;
    for (var pos = 0; pos < len; pos++) {
      out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
    }
    return out;
  }

  microbitCallBack(type, device, data) {
    if (type === 'connected') {
      let devices = this.state.devices;
      devices[device.serialNumber] = device;
      this.setState({ devices: devices });
      this.createGraph(device);
    }

    let graphs = this.state.graphs;
    let seriesData = data;

    if (
      device !== undefined &&
      device !== null &&
      device.serialNumber !== undefined &&
      device.serialNumber !== null &&
      graphs[device.serialNumber] !== undefined &&
      graphs[device.serialNumber] !== null &&
      graphs[device.serialNumber].series !== undefined &&
      graphs[device.serialNumber].series !== null &&
      seriesData !== null &&
      seriesData !== undefined &&
      seriesData.data !== undefined &&
      seriesData.data !== undefined
    ) {
      let specificGraph = graphs[device.serialNumber];
      let series = graphs[device.serialNumber].series[0];
      if (isNaN(seriesData.data)) {
        seriesData.data = this.convertLetterToNumber(seriesData.data);
      }
      seriesData.data = Math.round(10 * seriesData.data) / 10; // round to the nearest tenth
      series.data.push(seriesData.data.toString());
      let updatedGraph = [...graphs];
      updatedGraph[device.serialNumber] = {
        ...updatedGraph[device.serialNumber],
        deviceSerial: specificGraph.deviceSerial,
        title: specificGraph.title,
        isRunning: specificGraph.isRunning,
        timeElapsed: specificGraph.timeElapsed,
        series: [series],
        options: specificGraph.options,
        seriesLine: specificGraph.seriesLine,
        optionsLine: specificGraph.optionsLine,
      };
      this.setState({
        graphs: updatedGraph,
      });
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
        fake: false,
        deviceSerial: device.serialNumber,
        title: 'Microbit Graph ' + (this.state.microbitsConnected + 1),
        isRunning: false,
        timeElapsed: 0,
        series: [
          {
            data: [],
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
            data: [],
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
            tickAmount: 1,
          },
        },
      };
      this.setState({
        graphs: graphs,
        microbitsConnected: this.state.microbitsConnected + 1,
      });
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeTab: name });

  generateFakeGraph() {
    let graphs = this.state.graphs;
    graphs[this.state.microbitsConnected] = {
      fake: true,
      deviceSerial: this.state.microbitsConnected,
      title: 'Microbit Graph ' + (this.state.microbitsConnected + 1),
      isRunning: false,
      timeElapsed: 0,
      series: [
        {
          data: [],
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
          data: [],
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
          tickAmount: 1,
        },
      },
    };
    this.setState({
      graphs: graphs,
      microbitsConnected: this.state.microbitsConnected + 1,
    });
  }

  contextRef = createRef();

  render() {
    const graphs = this.state.graphs;
    const { activeTab } = this.state;

    return (
      <div>
        <Header as="h2" icon inverted textAlign="center">
          <Icon name="line graph" />
          Micro: bit USB Grapher
          <Header.Subheader>
            Collect and graph data on one or more Micro: bits!
          </Header.Subheader>
        </Header>

        <Container textAlign="right" style={{ marginBottom: '-46px' }}>
          <Button
            onClick={() => {
              var element = document.createElement('a');
              element.setAttribute('href', hexFile);
              element.setAttribute('download', 'microbitProgram.hex');

              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            }}
          >
            Download Hex File
          </Button>

          <HelpButton />
        </Container>

        <Container textAlign="left">
          <AddMicroButton onAddComplete={this.microbitCallBack} />
          <Button
            onClick={() => {
              this.generateFakeGraph();
            }}
          >
            <Icon name="plus" />Add Fake Microbit
          </Button>
        </Container>

        <Container textAlign="left" style={{ marginTop: '10px' }}>
          <Menu attached="top" id="tabView" tabular>
            {Object.keys(graphs).map((key, index) => {
              return (
                <Menu.Item
                  name={graphs[key].title}
                  active={activeTab === graphs[key].title}
                  onClick={this.handleItemClick}
                />
              );
            })}
          </Menu>
        </Container>
        <StickyStatistics
          microbitsConnected={this.state.microbitsConnected}
          timeElapsed={this.state.timeElapsed}
        />
        <Container>
          {Object.keys(graphs).map((key, index) => {
            if (
              this.state.activeTab === graphs[key].title &&
              graphs[key].title &&
              graphs[key].options &&
              graphs[key].series
            ) {
              console.log(this.state.fake)
              return (
                <div>
                  <MicrobitGraph
                    fake={graphs[key].fake}
                    device={this.state.devices[key]}
                    title={graphs[key].title}
                    options={graphs[key].options}
                    series={graphs[key].series}
                    optionsLine={graphs[key].optionsLine}
                    seriesLine={graphs[key].seriesLine}
                    height={graphs[key].height}
                    areaHeight={graphs[key].areaHeight}
                    isRunning={graphs[key].isRunning}
                    graphs={graphs}
                    key={key}
                    setState={this.setState}
                    playOnClick={() => {
                      let updatedGraphs = Object.assign(this.state.graphs);
                      updatedGraphs[key].isRunning = updatedGraphs[key]
                        .isRunning
                        ? false
                        : true;
                      this.setState({
                        graphs: updatedGraphs,
                      });
                    }}
                    disconnectDevice={this.disconnectDevice.bind(this)}
                  />
                </div>
              );
            } else {
              return <div />;
            }
          })}
        </Container>
      </div>
    );
  }
}

export default App;
