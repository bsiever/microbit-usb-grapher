import React, {Component} from 'react';
import Chart from 'react-apexcharts';
import { Container, Table, Divider } from 'semantic-ui-react';
import PlayButton from './components/PlayButton';
import SaveDataButton from './components/SaveData';
import BrushChart from './components/BrushChart';
import moment from 'moment';

class MicrobitGraph extends Component {
  render () {
    return (
        <Container>
          
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={2} verticalAlign="top"> 
              <PlayButton isRunning={this.props.isRunning} onClick={this.props.playOnClick}/>

              <Divider hidden/>

              <SaveDataButton csvData={this.props.csvData} fileName={"microbit-usb-data-" + moment().format('MM-DD')}/>
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
    );
  }
}

export default MicrobitGraph;
