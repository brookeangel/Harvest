import React from 'react';

const AboutModal = () => (
  <div className="internal-modal">
    <div className="modal-carrots">
      <p>
        <a href="https://github.com/brookeangel/Harvest" target="_blank">
          <i className="fa fa-github fa-4x" aria-hidden="true"></i>
        </a>
        <a href="https://www.linkedin.com/in/brookeangel" target="_blank">
          <i className="fa fa-linkedin fa-4x" aria-hidden="true"></i>
        </a>
        <a href="http://brookeangel.github.io/" target="_blank">
          <i className="fa fa-user fa-4x" aria-hidden="true"></i>
        </a>
      </p>
    </div>
    <div className='modal-text'>
      <p>
        40% of food in the United States goes to waste. Harvst is a platform for foraging and sharing excess fruit and vegetables from your garden to build community and prevent food waste.
      </p>
      <p>
        This site was created as Brooke Angel's capstone project at App Academy, using React/Redux and a Rails backend.
      </p>
    </div>
  </div>
);

export default AboutModal;
