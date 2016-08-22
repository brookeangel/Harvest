import React from 'react';
import ReactModal from 'react-modal';
import ModalContent from './modal_content';
import HarvstMap from './harvst_map';
import HarvstIndexItem from './harvst_index_item';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { requestHarvsts, setActiveHarvst } from '../../actions/harvst_actions';

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

  openModal(harvst) {
    this.setState({modalOpen: true, activeHarvst: harvst});
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

  render() {
    return(
      <div className='container'>
        <ReactModal
          style={{overlay: {zIndex: 100}}}
          className={this.state.modalStyles}
          isOpen={this.state.modalOpen}
          onRequestClose={() => this.props.setActiveHarvst(null)}>
          <ModalContent harvst={this.state.activeHarvst} />
        </ReactModal>
        <HarvstMap harvsts={this.props.harvsts}
          hoveredHarvst={this.state.hoveredHarvst}
          setActiveHarvst={this.props.setActiveHarvst}/>
        <div className='harvsts-index'>
          {this.props.harvsts.map(harvst => (
            <HarvstIndexItem key={harvst.id}
              harvst={harvst}
              mouseEnter={() => this.indexItemMouseEnter(harvst)}
              mouseLeave={() => this.indexItemMouseLeave(harvst)}
              openModal={() => this.props.setActiveHarvst(harvst)} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: Boolean(state.session.currentUser),
  harvsts: state.harvsts,
  activeHarvst: state.activeHarvst
});

const mapDispatchToProps = dispatch => ({
  requestHarvsts: () => dispatch(requestHarvsts()),
  setActiveHarvst: harvst => dispatch(setActiveHarvst(harvst))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HarvestIndex);
