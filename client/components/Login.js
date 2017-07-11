import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      playerName : ''
    }
  }
  onUserNameChange(e) {
    this.setState({playerName: e.target.value});
  }
  onSubmit() {
    this.props.onSubmit(this.state.playerName);
  }
  render() {
    return (
      <div>
        <input type="text" onChange={this.onUserNameChange.bind(this)} placeholder="Enter Your Name"/>
        <button onClick={this.onSubmit.bind(this)}>Start Playing</button>
      </div>
    );
  }
}

export default Login;
