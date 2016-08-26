import React from 'react';
import { connect } from 'react-redux';
import harvstsSelector from '../../reducers/harvsts_selector';
import HarvstIndexItem from './harvst_index_item';

const StarredHarvestDrawer = ({ harvsts, isOpen }) => {
  let emptyHarvstMessage;
  if (harvsts.length === 0) {
    emptyHarvstMessage = "You haven't starred any harvests!";
  }

  let className = 'harvst-drawer';
  if (!isOpen) {
    className += ' hidden-drawer';
  }

  return(
    <div className={className}>
      {harvsts.map(harvst => (
        <HarvstIndexItem key={harvst.id} harvst={harvst} />
      ))}
      { emptyHarvstMessage }
    </div>
  );
};

const mapStateToProps = state => ({
  harvsts: harvstsSelector(state.harvsts.starredHarvsts),
  isOpen: state.activeHarvst.drawerOpen
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StarredHarvestDrawer);
