import React from 'react';
import ReactModal from 'react-modal';
import ModalContent from './modal_content';
import HarvstMap from './harvst_map';
import HarvstIndexItem from './harvst_index_item';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import activeHarvstSelector from '../../reducers/active_harvst_selector';
import harvstsSelector from '../../reducers/harvsts_selector';
import {
  toggleStar,
  requestHarvsts,
  setActiveHarvst
} from '../../actions/harvst_actions';

class HarvestIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      activeHarvst: null,
      hoveredHarvst: null,
      modalStyles: 'modal-styles modal-opening'
    };
  }

  componentDidMount() {
    this.props.requestHarvsts();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeHarvst !== nextProps.activeHarvst) {
      if (nextProps.activeHarvst) {
        this.openModal(nextProps.activeHarvst);
      } else {
        this.closeModal();
      }
    }
  }

  openModal(harvstId) {
    this.setState({modalOpen: true, activeHarvst: harvstId});
    setTimeout(() => this.setState({modalStyles: 'modal-styles'}), 0);
  }

  closeModal() {
    this.setState({modalStyles: 'modal-styles modal-opening'});
    setTimeout(() => this.setState({modalOpen: false}), 500);
  }

  indexItemMouseEnter(harvst) {
    this.setState({hoveredHarvst: harvst});
  }

  indexItemMouseLeave() {
    this.setState({hoveredHarvst: null});
  }

  star(e, harvst) {
    e.stopPropagation();
    this.props.toggleStar(harvst);
  }

  render() {
    let activeHarvst = activeHarvstSelector(
      this.props.harvsts,
      this.state.activeHarvst
    );

    return(
      <div className='container'>
        <ReactModal
          style={{overlay: {zIndex: 100}}}
          className={this.state.modalStyles}
          isOpen={this.state.modalOpen}
          onRequestClose={() => this.props.setActiveHarvst(null)}>
          <ModalContent
            onStar={(e) => this.star(e, activeHarvst)}
            harvst={activeHarvst} />
        </ReactModal>
        <HarvstMap harvsts={this.props.harvsts}
          hoveredHarvst={this.state.hoveredHarvst}
          setActiveHarvst={this.props.setActiveHarvst}/>
        <div className='harvsts-index'>
          {this.props.harvsts.map(harvst => (
            <HarvstIndexItem key={harvst.id}
              harvst={harvst}
              toggleStar={(e) => this.star(e, harvst)}
              mouseEnter={() => this.indexItemMouseEnter(harvst)}
              mouseLeave={() => this.indexItemMouseLeave(harvst)}
              openModal={() => this.props.setActiveHarvst(harvst.id)} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: Boolean(state.session.currentUser),
  harvsts: harvstsSelector(state.harvsts),
  activeHarvst: state.activeHarvst
});

const mapDispatchToProps = dispatch => ({
  requestHarvsts: () => dispatch(requestHarvsts()),
  setActiveHarvst: harvstId => dispatch(setActiveHarvst(harvstId)),
  toggleStar: harvst => dispatch(toggleStar(harvst))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HarvestIndex);
