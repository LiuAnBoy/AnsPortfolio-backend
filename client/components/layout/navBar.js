import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import { useRouter } from "next/router";
import { links } from "../../constants/navLink";
import { theme } from "../../styles/theme";
import SideBar from "./sideBar";

const useStyles = makeStyles({
  appBar: {
    width: "100vw",
    maxWidth: "100%",
    height: "80px",
    position: "fixed",
    transition: theme.transitions.create("transform", { duration: "1s" }),
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  appBar_scrollDown: {
    width: "100vw",
    maxWidth: "100%",
    height: "80px",
    position: "fixed",
    transition: theme.transitions.create("transform", { duration: "1s" }),
    backgroundColor: "rgba(44, 174, 186, 0)",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-around",
    height: "inherit",
    width: 1200,
    margin: "0 auto",
  },
  sideBarButton: {
    position: "fixed",
    zIndex: 999,
    backgroundColor: theme.palette.primary.main,
    right: 0,
    margin: 15,
    height: 48,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  font: {
    color: theme.palette.text.main,
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: 20,
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.text.hover,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  sidebarBtn: {
    position: "absolute",
    zIndex: 999,
    backgroundColor: "#e0fcff",
    right: 0,
    margin: 15,
    height: 48,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
});

const NavBar = () => {
  const classes = useStyles();
  const router = useRouter();

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

    window.addEventListener("scroll", isScrollDown);
  }, []);

  return (
    <div>
      <AppBar
        className={scrollDown ? classes.appBar : classes.appBar_scrollDown}
        elevation={0}
      >
        <Toolbar className={classes.toolBar}>
          {links.map((link) => (
            <div
              key={link.id}
              className={classes.font}
              onClick={() => router.push(`${ link.link }`)}
            >
              {link.text}
            </div>
          ))}
        </Toolbar>
      </AppBar>
      <div onClick={handleOpen} className={classes.sidebarBtn}>
        <FormatAlignRightIcon style={{ fontSize: "48px", color: "#00b3b3" }} />
      </div>
      <SideBar handleClose={handleClose} open={open} />
    </div>
  );
};

export default NavBar;
