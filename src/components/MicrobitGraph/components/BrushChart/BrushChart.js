import React from 'react';
import Chart from 'react-apexcharts';

export class BrushChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          tickAmount: 2,
        },
      },
      seconds: 0,
    };
  }

  tick() {
    if (
      this.props.runRealtimeData &&
      this.props.series[0].data[0] !== undefined
    ) {
      this.setState((prevState) => ({
        seconds: prevState.seconds + 1,
      }));
    } else {
      this.setState((prevState) => ({
        seconds: prevState.seconds,
      }));
    }
  }

  pushRealtimeData() {
    if (
      this.state.series[0].data != null &&
      this.state.series[0].data !== undefined &&
      this.props.runRealtimeData &&
      this.props.series[0].data[this.state.seconds] !== undefined
    ) {
      this.setState({
        series: [
          {
            data: this.state.series[0].data.concat(
              this.props.series[0].data[this.state.seconds]
            ),
          },
        ],

        seriesLine: [
          {
            data: this.state.series[0].data,
          },
        ],
        options: {
          xaxis: {
            type: 'datetime',
            categories: this.state.options.xaxis.categories.push(
              this.state.seconds
            ),
          },
        },
      });

      this.props.setCSVData(this.state.series[0].data);
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
    this.interval = setInterval(() => this.pushRealtimeData(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <Chart options={this.state.options} series={this.state.series} />
        <Chart
          options={this.state.optionsLine}
          series={this.state.seriesLine}
          type="area"
          height={130}
        />
        <div>Timer: {this.state.seconds}</div>
      </div>
    );
  }
}
