import React from 'react';
import { connect } from 'react-redux';
import {
  toggleStar,
  setActiveHarvst,
  setHoveredHarvst
} from '../../actions/harvst_actions';

class HarvstIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.star = this.star.bind(this);
    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  star(e) {
    e.stopPropagation();
    this.props.toggleStar(this.props.harvst);
  }

  mouseEnter() {
    this.props.setHoveredHarvst(this.props.harvst.id);
  }

  mouseLeave() {
    this.props.setHoveredHarvst(null);
  }

  render() {
    const { harvst, setActive } = this.props;

    return(
      <div className="harvst-index-item"
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onClick={() => setActive(harvst.id)}>
        <div className="harvst-logo"
          style={{backgroundImage: `url(${harvst.image_url})`}}>
        </div>
        <div className="index-item-info">
          <div>
            <h2>{harvst.title}</h2>
            <a onClick={this.star}>
              <i className={harvst.star_id ?
                  "fa fa-star" : "fa fa-star-o"}
                aria-hidden="true"></i>
            </a>
          </div>
          <div>
            <p>
              {harvst.user.username}
            </p>
            <p>
              {harvst.created_at}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  setActive: harvstId => dispatch(setActiveHarvst(harvstId)),
  setHoveredHarvst: harvstId => dispatch(setHoveredHarvst(harvstId)),
  toggleStar: harvst => dispatch(toggleStar(harvst))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HarvstIndexItem);
