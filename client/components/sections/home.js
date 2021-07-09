import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { theme } from "../../styles/theme";
import MButton from "../shared/button";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.primary,
    position: "relative",
    "&:before": {
      position: "absolute",
      content: "\"\"",
      top: 0,
      left: "65%",
      right: 0,
      width: "35%",
      height: "100vh",
      background: theme.palette.background.default,
    },
  },
  intro: {
    position: "absolute",
    top: "50%",
    left: "25%",
    transform: "translateY(-50%)",
    width: 500,
    [theme.breakpoints.down("xs")]: {
      width: "87.6vw",
      position: "relative",
      margin: "0 auto",
      left: 0,
    },
  },
  underline: {
    background: "#2caeba",
    height: "4px",
    width: "80px",
    margin: "0 0 10px 0",
  },
  name: {
    fontWeight: 700,
    letterSpacing: 2,
    fontFamily: "Roboto, sans-serif",
    color: "#102a42",
    [theme.breakpoints.down("xs")]: {
      fontSize: 42,
    },
  },
  subtitle: {
    letterSpacing: 2,
    fontWeight: 700,
    color: "#102a42",
    marginBottom: 18,
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
  button: {
    width: 150,
  },
});

const Home = () => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <div className={classes.root}>
      <div className={classes.intro}>
        <div className={classes.underline}></div>
        <Typography variant="h2" className={classes.name}>
          Hi, I&apos;m Eric
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Freelance Front-End Developer and UI/UX Designer.
        </Typography>
        <div className={classes.button}>
          <MButton text="CONTACT ME" onClick={() => router.push("/contact")} />
        </div>
      </div>
    </div>
  );
};

export default Home;
