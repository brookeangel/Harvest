import React from 'react';
import ModalContent from './modal_content';
import HarvstMap from './harvst_map';
import StarredHarvestDrawer from './starred_harvst_drawer';
import HarvstIndex from './harvst_index';
const HarvstIndexContainer = () => (
  <div className='container'>
    <ModalContent />
    <HarvstMap />
    <HarvstIndex />
    <StarredHarvestDrawer />
  </div>
);

export default HarvstIndexContainer;
