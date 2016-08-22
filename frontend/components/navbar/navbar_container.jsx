import { logout } from '../../actions/session_actions';
import { receiveHarvstErrors } from '../../actions/harvst_actions';
import { connect } from 'react-redux';
import Navbar from './navbar';

const mapStateToProps = state => ({
  isLoggedIn: Boolean(state.session.currentUser),
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  clearErrors: () => dispatch(receiveHarvstErrors([]))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
