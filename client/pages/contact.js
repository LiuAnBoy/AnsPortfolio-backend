import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../styles/theme";
import Title from "../components/shared/title";
import ContactForm from "../components/layout/contactForm";
import Helmet from "../components/shared/helmet";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    maxWidth: "100%",
    height: "calc(100vh - 248px)",
    padding: "120px 0 60px",
    backgroundColor: "#e0fcff",
    [theme.breakpoints.down("xs")]: {
      padding: "100px 0 30px",
      height: "initial",
    },
  },
});

const Contact = () => {
  const classes = useStyles();
  return (
    <>
      <Helmet subtitle="Contact Me" siteTitle="Contact Me" siteURL="contact" />
      <div className={classes.root}>
        <Title title="Contact Me" />
        <ContactForm />
      </div>
    </>
  );
};

export default Contact;
