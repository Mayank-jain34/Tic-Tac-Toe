import React from 'react';
require("./Login.scss");

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
  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.playerName);
  }
  render() {
    return (
      <div className="login-container">
        <h1 className="app-title"><span>TIC</span> <span>TAC</span> <span>TOE</span></h1>
        <form className="login-form" onSubmit={this.onSubmit.bind(this)}>
          <input required type="text" onChange={this.onUserNameChange.bind(this)} placeholder="Enter Your Name"/>
          <button type="submit">Start Playing</button>
        </form>
      </div>
    );
  }
}

export default Login;
