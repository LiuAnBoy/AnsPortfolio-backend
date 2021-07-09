import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#2caeba",
    color: "#bff8fd",
    padding: "8px 18px",
    boxShadow: "0 1px 3px rgb(0 0 0 / 20%)",
    transition: "all 0.3s linear",
    fontWeight: 700,
    letterSpacing: 2,
    width: "100%",
    "&:hover": {
      backgroundColor: "#88ebf2",
      color: "#102a42",
    },
  },
});

const MButton = ({
  text, onClick, type, disabled,
}) => {
  const classes = useStyles();
  return (
    <Button className={classes.root} onClick={onClick} type={type} disabled={disabled}>
      {text || "Button"}
    </Button>
  );
};

MButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default MButton;
