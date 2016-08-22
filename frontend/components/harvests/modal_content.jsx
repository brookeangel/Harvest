import React from 'react';

const ModalContent = ({ harvst, onStar }) => (
  <div className='harvst-modal'
    style={{backgroundImage: `url('${harvst.image_url}')`}}>

    <a className="harvst-modal-star" onClick={onStar}>
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

export default ModalContent;
