import React, { useEffect, useState } from 'react';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import Link from 'next/link';

import SideBar from './SideBar';
import NavLinks from '../../constants/NavLinks';
import NavBarRootStyled from '../../styles/components/layouts/NavBar';

const NavBar = () => {
  const [scrollDown, setScrollDown] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const isScrollDown = () => {
      if (window.scrollY >= 700) {
        setScrollDown(true);
      } else {
        setScrollDown(false);
      }
    };

    window.addEventListener('scroll', isScrollDown);
  }, []);

  return (
    <NavBarRootStyled
      style={
        scrollDown
          ? { backgroundColor: '#e0fcff' }
          : { backgroundColor: 'rgba(0, 0, 0, 0)' }
      }
    >
      <div className="nav-bar">
        <Link href="/">
          <img
            alt="favicon"
            src="https://res.cloudinary.com/cla/image/upload/v1625984174/Portfolio/favicon_kue56d.png"
          />
        </Link>
        <div className="nav-links-group">
          <NavLinks />
        </div>
      </div>
      <div
        onClick={handleOpen}
        className="nav-side-button"
        onKeyPress={handleOpen}
      >
        <FormatAlignRightIcon className="nav-side-icon" />
      </div>
      <SideBar handleClose={handleClose} open={open} />
    </NavBarRootStyled>
  );
};

export default NavBar;
