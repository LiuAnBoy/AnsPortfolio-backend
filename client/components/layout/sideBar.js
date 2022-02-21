import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';

import NavLinks from '../../constants/NavLinks';

const SideBar = ({ handleClose, open }) => {
  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        className="nav-draw"
      >
        <div
          onClick={handleClose}
          className="nav-close-icon"
          onKeyPress={handleClose}
          style={{ position: 'absolute', right: 0 }}
        >
          <ClearIcon style={{ fontSize: 42, margin: 15 }} />
        </div>
        <div style={{ width: 180, position: 'relative', top: 90 }}>
          <NavLinks handleClose={handleClose} />
        </div>
      </Drawer>
    </div>
  );
};

SideBar.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default SideBar;
