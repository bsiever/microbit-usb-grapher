# Micro:bit USB Grapher

A WebPage/Site that can graph data collected on the micro:bit. 

## Project Overview

TODO: Blutb

## Features

* Required
  * Data will be streamed from one or more micro:bits. 
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

## Potential Components 

### USB Interaction
* [Microbit-WebUSB](https://github.com/bsiever/microbit-webusb): An simple API designed to  retrieve data from a micro:bit via USB.  It was designed specifically to support this project.

### Graphing

* [Chart.js](https://www.chartjs.org/)

TODO: More and descriptions of good/bad

## Example Documentation 

### Experiment Setup (prior to this application)

TODO: Get example docs


