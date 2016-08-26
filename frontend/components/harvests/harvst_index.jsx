import React from 'react';
import HarvstIndexItem from './harvst_index_item';
import { connect } from 'react-redux';
import harvstsSelector from '../../reducers/harvsts_selector';

const HarvstIndex = ({ harvsts }) => {
  let emptyHarvstMessage;
  if (harvsts.length === 0) {
    emptyHarvstMessage = "Sorry, nothing to harvest in this area!";
  }

  return(
    <div className='harvsts-index'>
      {harvsts.map(harvst => (
        <HarvstIndexItem key={harvst.id} harvst={harvst} />
      ))}
      { emptyHarvstMessage }
    </div>
  );
};

const mapStateToProps = state => ({
  harvsts: harvstsSelector(state.harvsts.inBoundsHarvsts)
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HarvstIndex);
