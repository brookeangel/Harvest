import { logout } from '../../actions/session_actions';
import {
  receiveHarvstErrors,
  resetForm,
  toggleDrawer
} from '../../actions/harvst_actions';
import { connect } from 'react-redux';
import Navbar from './navbar';

const mapStateToProps = state => ({
  isLoggedIn: Boolean(state.session.currentUser),
  currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  resetForm: () => dispatch(resetForm()),
  toggleDrawer: () => dispatch(toggleDrawer())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
