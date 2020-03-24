import React, {Component} from 'react';
import Chart from 'react-apexcharts';

class BrushChart extends Component {
  render () {
    return (
      <div>
        <Chart options={this.props.options} series={this.props.series} />
        <Chart
          options={this.props.optionsLine}
          series={this.props.seriesLine}
          type="area"
          height={this.props.optionsLine.chart.height}
        />
      </div>
    );
  }
}

export default BrushChart;
