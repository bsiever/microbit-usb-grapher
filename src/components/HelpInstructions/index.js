/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import {
  Icon,
  Button,
  Modal,
  Accordion,
  Image,
  Embed,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class HelpButton extends Component {
  state = { open: false, activeIndex: 0 };

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };

  close = () => this.setState({ open: false });

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { open, closeOnEscape, closeOnDimmerClick, activeIndex } = this.state;
    return (
      <div>
        <Button
          onClick={this.closeConfigShow(true, false)}
          icon
          labelPosition="left"
          color="blue"
        >
          <Icon name="question circle outline" />
          Help
        </Button>
        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
          closeIcon
        >
          <Modal.Header>Instructions</Modal.Header>
          <Modal.Content>
            <Accordion>
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                How to pair a Micro:bit device?
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <div class="ui grid stackable">
                  <div class="column five wide firmware">
                    <strong class="ui small">
                      You must have version 0249 or above of the firmware
                    </strong>
                    <div class="image">
                      <img class="ui image" src="./images/firmware.png" />
                    </div>
                    <a
                      href="https://makecode.microbit.org/device/usb/webusb/troubleshoot"
                      target="_blank"
                    >
                      Check your firmware version here and update if needed
                    </a>
                  </div>
                  <div class="column eleven wide instructions">
                    <div class="ui grid">
                      <div class="row">
                        <div class="column">
                          <div class="ui two column grid padded">
                            <div class="column">
                              <div class="ui">
                                <div class="image">
                                  <img
                                    class="ui medium rounded image"
                                    src="./images/connect.png"
                                  />
                                </div>
                                <div class="content">
                                  <div class="description">
                                    <span class="ui purple circular label">
                                      1
                                    </span>
                                    <strong>
                                      Connect the micro:bit to your computer
                                      with a USB cable
                                    </strong>
                                    <br />
                                    <span class="ui small">
                                      Use the microUSB port on the top of the
                                      micro:bit
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="column">
                              <div class="ui">
                                <div class="image">
                                  <img
                                    class="ui medium rounded image"
                                    src="./images/pair.png"
                                  />
                                </div>
                                <div class="content">
                                  <div class="description">
                                    <span class="ui purple circular label">
                                      2
                                    </span>
                                    <strong>Pair your micro:bit</strong>
                                    <br />
                                    <span class="ui small">
                                      Click 'Pair device' below and select BBC
                                      micro:bit CMSIS-DAP or DAPLink CMSIS-DAP
                                      from the list
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                How to use the Micro:bit WebUSB Grapher?
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <a href="/public/AppInstructions.pdf" download>
                  Download PDF
                </a>
              </Accordion.Content>
              <Accordion.Title
                active={activeIndex === 2}
                index={2}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                How to program your Micro:bit?
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 2}>
                <div class="ui two column grid padded">
                  <div class="column">
                    <div class="ui">
                      <div class="image">
                        <img
                          class="ui medium rounded image"
                          src="./images/connect.png"
                        />
                      </div>
                      <div class="content">
                        <div class="description">
                          <span class="ui purple circular label">1</span>
                          <strong>
                            Connect the micro:bit to your computer with a USB
                            cable
                          </strong>
                          <br />
                          <span class="ui small">
                            Use the microUSB port on the top of the micro:bit
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="ui">
                      <div class="image">
                        <img
                          class="ui medium rounded image"
                          src="./images/transfer.png"
                        />
                      </div>
                      <div class="content">
                        <div class="description">
                          <span class="ui purple circular label">2</span>
                          <strong>Move the .hex file to the micro:bit</strong>
                          <br />
                          <span class="ui small">
                            Locate the downloaded .hex file and drag it to the
                            MICROBIT drive
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default HelpButton;
