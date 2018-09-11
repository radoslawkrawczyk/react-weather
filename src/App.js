import React, { Component } from 'react';
import { Appbar, Button, Container, Input, Divider } from 'muicss/react';

class App extends Component {
  render() {
    return (
      <div>
        <Appbar>
          <Container>
            <h1>React Weather</h1>
          </Container>
        </Appbar>
        <Container>
          <Input placeholder="Type your city" defaultValue="Warsaw" />
          <Button color="primary">Check</Button>
        </Container>
      </div>
    );
  }
}

export default App;
