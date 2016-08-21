import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

class HarvestIndex extends React.Component {
  render() {
    return(
      <div>index</div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: Boolean(state.session.currentUser)
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HarvestIndex);
