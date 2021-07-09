import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { theme } from "../../styles/theme";

const useStyles = makeStyles({
  root: {
    margin: "0 6px 0 0",
    backgroundColor: "#dae2ec",
    color: "#617d98",
    padding: "6px 10px",
    display: "inline-block",
    borderRadius: "2px",
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontSize: 12,
  },
});

const Tag = ({ text, onChangeOptions }) => {
  const classes = useStyles();
  return <div className={classes.root} onClick={onChangeOptions}>{text}</div>;
};

export default Tag;
