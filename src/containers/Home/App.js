import React from 'react';
import '../../styles/App.css';
import {Container, Divider, Table} from 'semantic-ui-react';
import {Header, Icon} from 'semantic-ui-react';
import BrushChart from '../../components/BrushChart';
import PlayButton from '../../components/PlayButton';
import SaveDataButton from '../../components/SaveData';
const moment = require('moment');

class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      isRunning: false,
      series: [
        {
          data: ['100', '200', '400'],
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
  }

  render () {

    var arr = [2, 5, 6, 3, 8, 9]; 
          
        var csvData = arr.map(function(val, index){ 
            return {key:index, value:val*val}; 
        }) 

    return (
      <div>

        <Header as="h2" icon inverted textAlign="center">
          <Icon name="line graph" />
          Micro:Bit USB Grapher
          <Header.Subheader>
            Collect and graph data on one or more Miro:bits!
          </Header.Subheader>
        </Header>
        <Divider />

        <Container>
          <Table definition>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={2} verticalAlign="top"> 
                <PlayButton />

                <Divider hidden/>

                <SaveDataButton csvData={csvData} fileName={"microbit-usb-data-" + moment().format('MM-DD')}/>
                </Table.Cell>
                <Table.Cell>
                  <BrushChart
                    options={this.state.options}
                    series={this.state.series}
                    optionsLine={this.state.optionsLine}
                    seriesLine={this.state.seriesLine}
                    height={this.state.height}
                    areaHeight={this.state.areaHeight}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
      </div>
    );
  }
}

export default App;
