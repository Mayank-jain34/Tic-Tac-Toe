import React from 'react';
import Login from '../login/LoginContainer';
import Playground from '../playground/PlaygroundContainer';

class App extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.isLoggedIn
          ? <Playground />
          : <Login />
        }
      </div>
    );
  }
}

export default App;
