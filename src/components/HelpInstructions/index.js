/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import {
  Icon,
  Button,
  Modal,
  Accordion,
  Header,
  Divider,
} from 'semantic-ui-react';
import pdf from './instructions/MicrobitWebUSBGrapher-Instructions.pdf';

class HelpButton extends Component {
  state = { open: false, activeIndex: -1 };

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
          <Modal.Header style={{ color: '#FFF', backgroundColor: '#252839' }}>
            Micro:bit and Application Help
          </Modal.Header>
          <Modal.Content>
            <Header>
              Instructions:{' '}
              <a target="_blank" rel="noopener noreferrer" href={pdf}>
                Click to Download PDF
              </a>
            </Header>
            <Divider />
            <Header>Frequently Asked Questions (FAQ):</Header>
            <Accordion styled fluid>
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                How to use the Micro:bit WebUSB Grapher?
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <iframe src={pdf} height="900" width="900" />
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={this.handleClick}
              >
                <Icon name="dropdown" />
                How to pair a Micro:bit device?
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
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
                      rel="noopener noreferrer"
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
