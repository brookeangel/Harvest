import React from 'react';
import ModalContent from './modal_content';
import HarvstMap from './harvst_map';
import HarvstIndexItem from './harvst_index_item';
import { connect } from 'react-redux';
import harvstsSelector from '../../reducers/harvsts_selector';
import { requestHarvsts } from '../../actions/harvst_actions';

class HarvestIndex extends React.Component {
  componentDidMount() {
    this.props.requestHarvsts();
  }

  render() {
    return(
      <div className='container'>
        <ModalContent />
        <HarvstMap harvsts={this.props.harvsts} />
        <div className='harvsts-index'>
          {this.props.harvsts.map(harvst => (
            <HarvstIndexItem key={harvst.id} harvst={harvst} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  harvsts: harvstsSelector(state.harvsts)
});

const mapDispatchToProps = dispatch => ({
  requestHarvsts: () => dispatch(requestHarvsts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HarvestIndex);
