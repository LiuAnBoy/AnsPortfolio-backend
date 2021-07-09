import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../styles/theme";

const useStyles = makeStyles({
  root: {
    height: "350px",
    position: "relative",
    transitionDuration: ".4s",
    "&:hover $info_section": {
      opacity: 1,
    },
    "&:hover": {
      transform: "scale(1.01)",
    },
    [theme.breakpoints.down("xs")]: {
      height: 250,
    },
  },
  img: {
    width: "100%",
    height: "100%",
  },
  info_section: {
    position: "absolute",
    height: "28%",
    width: "100%",
    bottom: 0,
    background: "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.6) 81%)",
    display: "flex",
    alignItems: "center",
    opacity: 0,
    transitionDuration: ".2s",
    "& > p": {
      marginLeft: 24,
      fontSize: 18,
      color: "#fff",
      letterSpacing: 1.2,
    },
    [theme.breakpoints.down("xs")]: {
      opacity: 1,
      "& > p": {
        fontSize: 14,
      },
    },
  },
});

const ProjectBlock = ({
  img, title, company, onClick,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root} onClick={onClick}>
      <img src={img} className={classes.img} />
      <div className={classes.info_section}>
        <p>
          {company} - {title}
        </p>
      </div>
    </div>
  );
};

export default ProjectBlock;
