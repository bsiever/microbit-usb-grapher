# Launch our App! 

[Go!](https://bsiever.github.io/microbit-usb-grapher/)

# Micro:bit USB Grapher

A WebPage/Site that can graph, manipulate, and save data collected on the micro:bit. 

## Project Overview

The [micro:bit](https://microbit.org/) is a low-cost hardware platform that is used to introduce both computer programming principles and to facilitate maker activities, like making wearables. It's already widely used by K-12 educators for computing activities, but, due to it on-board sensors and its extensibility, it's could also augment classroom science demonstrations.  (For example, the existing [Makecode](https://makecode.microbit.org) editor already can be used to collect and graph streaming data. See [here](https://makecode.microbit.org/_Yfrc6f85EMR5) for a simulated micro:bit graphing accelerometer data. Click the `Edit` button, then clicke the `Show console Simulator` button.  The micro:bit shown as a rectangle with buttons and gold connectors at the bottom. Moving over the image of the micro:bit will simulate tilting and the graphed data)

The Makecode simulator can already collect and graph data, but it's data collection window can only graph a small sample of data and it's limited to just one micro:bit at a time.  The goal of this project is to develop a stand-alone web site that will collect information from one or more micro:bits and allow users to graph a wider range of data and interact with the data in ways not supported by Makecode.

## Features

* Required
  * Data will be streamed from one or more micro:bits. 
  * Graphs should have titles, axis labels and titles, and legends
  * Data will include numeric values that correspond to time-series.  They should be depicted graphically
    * There may be multiple graphs and each graph may have multiple time series shown
    * The number of graphs and series per graph must be updated dynamically.  New graphs may need to be added as data is collected.
    * Users should be able to zoom in/out of data
    * Data and ranges should be clearly visible
    * Time scales should be easily identifiable
    * Users should be able to pan through data
    * By default time series should be shown in strip-chart format and most recent data should be shown (autoscrolling)
      * Auto scrolling should be able to be disabled to allow users to view older data as data continues to arrive
    * Text labels (events) may also be included.  This should be depicted on the time series as well.  Although the text doesn't always need to be visible, there should be clear that there is text available and it should be easy to retrieve the text.
  * Users should be able to download all data as a CSV file
* Desireable 
  * Ability to measure time between different events

## Deliverables 

* A web-app for collecting and graphing time-series data and events from micro:bits
  * should allow users to interact with data to find features of interest
* Instruction manuals & Documentation
  * Use
  * Setup and Application Architecture (how to deploy a new instance and anything future developers may need to know/understand)

## Potential Components 

### USB Interaction
* [Microbit-WebUSB](https://github.com/bsiever/microbit-webusb): An simple API designed to  retrieve data from a micro:bit via USB.  It was designed specifically to support this project.

### Graphing

* [Chart.js](https://www.chartjs.org/)
* [Chartist](https://gionkunz.github.io/chartist-js/)
* [D3](https://d3js.org/)
* [Plot.ly](https://plot.ly/javascript/)
* [ApexCharts.js](https://apexcharts.com/)
* [JSCharts](http://www.jscharts.com):  Free version is watermarked

TODO: More and descriptions of good/bad

## Example Documentation 

### Experiment Setup (prior to this application)

* [mySci:Do C.S. Extension](https://docs.google.com/presentation/d/1CIyQK71pNGHjf5gfHqg3yD-sWP0rnXZlt6-MK9j_ISk/edit?ts=5c9e48f6#slide=id.g5475e6f318_0_0)
* Example lesson plans that may use equipment/app
  * [Thermal Energy Integration](https://docs.google.com/document/d/1QrpOTx8CPjq-xRYbbaWQmzVJVbB77bzh9p2SAFtpW98/edit?usp=sharing)
