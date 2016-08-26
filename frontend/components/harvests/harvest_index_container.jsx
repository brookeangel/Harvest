import React from 'react';
import ModalContent from './modal_content';
import HarvstMap from './harvst_map';
import HarvstIndexItem from './harvst_index_item';
import { connect } from 'react-redux';
import harvstsSelector from '../../reducers/harvsts_selector';

class HarvestIndex extends React.Component {
  render() {
    let emptyHarvstMessage;
    if (this.props.harvsts.length === 0) {
      emptyHarvstMessage = "Sorry, nothing to harvest in this area!";
    }

    return(
      <div className='container'>
        <ModalContent />
        <HarvstMap harvsts={this.props.harvsts} />
        <div className='harvsts-index'>
          {this.props.harvsts.map(harvst => (
            <HarvstIndexItem key={harvst.id} harvst={harvst} />
          ))}
          { emptyHarvstMessage }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  harvsts: harvstsSelector(state.harvsts)
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HarvestIndex);
