import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { theme } from "../../styles/theme";

const useStyles = makeStyles({
  root: {
    margin: "0 0 60px",
    width: "100vw",
    maxWidth: "100%",
    [theme.breakpoints.up("xs")]: {
      margin: "0 0 30px",
    },
  },
  title: {
    fontWeight: 700,
    letterSpacing: 2,
    color: theme.palette.text.main,
    margin: "0 0 10px 0",
    textAlign: "center",
    width: "100vw",
    maxWidth: "100%",
  },
  underline: {
    background: theme.palette.primary.dark,
    height: "4px",
    width: "80px",
    margin: "0 auto",
  },
});

const Title = ({ title }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
      <div className={classes.underline}></div>
    </div>
  );
};

export default Title;
