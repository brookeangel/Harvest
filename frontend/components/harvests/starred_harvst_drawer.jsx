import React from 'react';
import { connect } from 'react-redux';
import harvstsSelector from '../../reducers/harvsts_selector';

class StarredHarvestDrawer extends React.Component {
  render() {
    let emptyHarvstMessage;
    if (this.props.harvsts.length === 0) {
      emptyHarvstMessage = "You haven't starred any harvests!";
    }

    return(
      <div className='harvst-drawer'>
        {this.props.harvsts.map(harvst => (
          <HarvstIndexItem key={harvst.id} harvst={harvst} />
        ))}
        { emptyHarvstMessage }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  harvsts: harvstsSelector(state.harvsts.starredHarvsts)
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StarredHarvestDrawer);
