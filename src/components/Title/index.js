import React, { Component } from 'react';
import {
  Button,
  Header,
  Container,
  Icon,
  Modal,
  Input,
} from 'semantic-ui-react';

class Title extends Component {
  state = { open: false };

  show = () => {
    this.setState({ open: true });
  };
  close = () => this.setState({ open: false });

  handleSubmit = () => {};

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const { open } = this.state;

    return (
      <Container textAlign="center">
        <Header size="huge" style={{ color: '#FFF' }}>
          {this.props.title}

          <Button
            animated="vertical"
            style={{ margin: '0 0 5px 15px' }}
            onClick={this.show}
          >
            <Button.Content hidden>Edit</Button.Content>
            <Button.Content visible>
              <Icon fitted name="pencil" />
            </Button.Content>
          </Button>
        </Header>

        <Modal
          onSubmit={this.handleSubmit()}
          size={'mini'}
          closeOnDimmerClick={false}
          open={open}
          onClose={this.close}
        >
          <Modal.Header>Edit Title</Modal.Header>

          <Modal.Content>
            <Input
              placeholder="Edit"
              type="text"
              name="title"
              onChange={this.handleChange}
              style={{ width: '100%' }}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.close}>
              Cancel
            </Button>
            <Button
              positive
              onClick={this.close}
              icon="checkmark"
              labelPosition="right"
              content="Save"
              type="submit"
            />
          </Modal.Actions>
        </Modal>
      </Container>
    );
  }
}

export default Title;
