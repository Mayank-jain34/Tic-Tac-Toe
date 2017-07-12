import { connect } from 'react-redux';
import Login from './Login';
import { loginAction } from '../../actions';
const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit : (playerName) => {
      dispatch(loginAction(playerName));
    }
  }
}

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
