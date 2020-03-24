import React, {Component} from 'react';
import {Button, Header, Container} from 'semantic-ui-react';

class Title extends Component {
  render () {
    return  (
        <Container textAlign="center">
            <Header content={this.props.title} size="huge" style={{color: '#FFF'}}/>
        </Container>
    )
  }
}

export default Title;
