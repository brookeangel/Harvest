import React from 'react';

const HarvstIndexItem = ({
  harvst,
  openModal,
  mouseEnter,
  mouseLeave,
  toggleStar
}) => (
  <div className="harvst-index-item"
    onMouseEnter={mouseEnter}
    onMouseLeave={mouseLeave}
    onClick={openModal}>
    <div className="harvst-logo"
      style={{backgroundImage: `url(${harvst.image_url})`}}>
    </div>
    <div className="index-item-info">
      <div>
        <h2>{harvst.title}</h2>
        <a onClick={toggleStar}>
          <i className={harvst.star_id ? "fa fa-star" : "fa fa-star-o"}
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

export default HarvstIndexItem;
