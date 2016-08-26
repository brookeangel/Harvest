import { connect } from 'react-redux';
import React from 'react';
import ReactModal from 'react-modal';
import { toggleStar, setActiveHarvst } from '../../actions/harvst_actions';

class ModalContent extends React.Component {

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      modalStyles: 'modal-styles modal-opening',
      modalOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.harvstId && this.props.harvstId !== nextProps.harvstId) {
        this.openModal();
    }
  }

  openModal() {
    this.setState({modalOpen: true});
    setTimeout(() => this.setState({modalStyles: 'modal-styles'}), 0);
  }

  closeModal() {
    this.setState({modalStyles: 'modal-styles modal-opening'});
    setTimeout(() => {
      this.setState({modalOpen: false});
      this.props.setActive(null);
    }, 500);
  }

  harvstInfo() {
    if (!this.props.harvstId) return <div></div>;
    let { harvstId, harvsts, onStar } = this.props;
    let harvst = harvsts[harvstId];

    return(
      <div className='harvst-modal'
        style={{backgroundImage: `url('${harvst.image_url}')`}}>

        <a className="harvst-modal-star" onClick={() => onStar(harvst)}>
          <i className={`fa ${harvst.star_id ? 'fa-star' : 'fa-star-o'} fa-3x`}
            aria-hidden="true"></i>
        </a>

        <div className='harvst-modal-overlay'>
          <div>
            <h1>{harvst.title}</h1>
            <p>{harvst.address}</p>
          </div>
          <div>
            <p>{harvst.user.username}</p>
            <p>{harvst.created_at}</p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { setActive } = this.props;

    return(
      <ReactModal
        style={{overlay: {zIndex: 100}}}
        className={this.state.modalStyles}
        isOpen={this.state.modalOpen}
        onRequestClose={this.closeModal}>
        { this.harvstInfo() }
      </ReactModal>
    );
  }
}


const mapStateToProps = state => ({
  harvstId: state.activeHarvst.activeHarvst,
  harvsts: state.harvsts.inBoundsHarvsts
});

const mapDispatchToProps = dispatch => ({
  onStar: harvst => dispatch(toggleStar(harvst)),
  setActive: harvst => dispatch(setActiveHarvst(harvst))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalContent);
