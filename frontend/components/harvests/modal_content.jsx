import React from 'react';

const ModalContent = ({ harvst }) => (
  <div className='harvst-modal'
    style={{backgroundImage: `url('${harvst.image_url}')`}}>

    <div className="harvst-modal-star">
      <i className="fa fa-star-o fa-3x" aria-hidden="true"></i>
    </div>

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
