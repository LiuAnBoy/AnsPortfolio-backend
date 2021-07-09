import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ClearIcon from "@material-ui/icons/Clear";
import { useRouter } from "next/router";
import { links } from "../../constants/navLink";
import { theme } from "../../styles/theme";
// import sendEmail from '../../store/actions/email';

const useStyles = makeStyles({
  list: {
    width: 200,
  },
  fullList: {
    width: "auto",
  },
  icon: {
    fontSize: 48,
    margin: 15,
  },
  list_icon: {
    margin: "5px 0px 0 120px",
  },
  text: {
    textAlign: "center",
    fontFamily: "Roboto, sans-serif",
    "&:hover": {
      color: "#00b3b3",
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
  reservationBtn: {
    fontFamily: "Roboto, sans-serif",
    color: "#fff",
    fontSize: "0.9vw",
    fontWeight: 400,
    backgroundColor: "#00cccc",
    borderRadius: "6px",
    cursor: "pointer",
    padding: "10px 20px",
    margin: 0,
    textAlign: "center",
    "&:hover": {
      backgroundColor: "#00b3b3",
    },
  },
});

const SideBar = ({ handleClose, open }) => {
  const classes = useStyles();
  const router = useRouter();

  const pushRouter = (link) => {
    router.push(`${ link }`);
    handleClose();
  };
  return (
    <div>
      <Drawer anchor="right" open={open} onClose={handleClose}>
        <div onClick={handleClose} className={classes.list_icon}>
          <ClearIcon className={classes.icon} />
        </div>
        {links.map((link) => (
          <div
            key={link.id}
            className={classes.font}
            onClick={() => pushRouter(link.link)}
          >
            {link.text}
          </div>
        ))}
      </Drawer>
    </div>
  );
};

export default SideBar;
