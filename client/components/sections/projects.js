import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Title from "../shared/title";
import { loadProjects } from "../../store/actions/project";
import { theme } from "../../styles/theme";
import MButton from "../shared/button";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    maxWidth: "100%",
    padding: "60px 0",
    backgroundColor: "#fff",
    [theme.breakpoints.down("xs")]: {
      padding: "36px 0",
    },
  },
  container: {
    width: 1440,
    margin: "0 auto",
    padding: "20px 0 10px",
    [theme.breakpoints.down("md")]: {
      width: "inherit",
    },
  },
  project: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    alignItems: "center",
    width: "80%",
    margin: "0 auto 48px",
    "&:hover $image_odd:after": {
      opacity: 0,
    },
    "&:hover $image_even:after": {
      opacity: 0,
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      width: "89vw",
      margin: "0 auto",
    },
  },
  image_odd: {
    gridColumn: "7 / -1",
    gridRow: "1 / 1",
    height: "420px",
    width: "520px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    borderRadius: 2,
    position: "relative",
    "&:after": {
      content: "\"\"",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      background: "linear-gradient(to bottom right, #2caeba, #222)",
      opacity: "0.85",
      transition: "all 0.3s linear",
    },
    [theme.breakpoints.down("xs")]: {
      height: "250px",
      width: "100%",
    },
  },
  image_even: {
    gridColumn: "1 / span 6",
    gridRow: "1 / 1",
    height: "420px",
    width: "520px",
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    borderRadius: 2,
    position: "relative",
    "&::after": {
      content: "\"\"",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
      background: "linear-gradient(to bottom right, #2caeba, #222)",
      opacity: "0.85",
      transition: "all 0.3s linear",
    },
    [theme.breakpoints.down("xs")]: {
      height: "250px",
      width: "100%",
    },
  },
  image: {
    height: "100%",
    width: "100%",
  },
  title: {
    margin: "12px 0",
    fontSize: 24,
  },
  description: {
    margin: "12px 0",
    padding: "10px 0",
    height: 75,
    [theme.breakpoints.down("sm")]: {
      height: 100,
    },
    [theme.breakpoints.down("xs")]: {
      height: 100,
    },
  },
  info_odd: {
    padding: "16px 32px",
    backgroundColor: "#fff",
    gridColumn: "3 / span 5",
    gridRow: "1 / 1",
    zIndex: 1,
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    borderRadius: 2,
    fontFamily: "Roboto",
    [theme.breakpoints.down("md")]: {
      gridColumn: "6 / 12",
    },
    [theme.breakpoints.down("sm")]: {
      gridColumn: "6 / span 12",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "25px",
      padding: "16px 24px",
    },
  },
  info_even: {
    padding: "16px 32px",
    backgroundColor: "#fff",
    gridColumn: "6 / 11",
    gridRow: "1 / 1",
    zIndex: 1,
    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    borderRadius: 2,
    fontFamily: "Roboto",
    [theme.breakpoints.down("md")]: {
      gridColumn: "2 / span 6",
    },
    [theme.breakpoints.down("sm")]: {
      gridColumn: "1 / span 7",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "25px",
      padding: "16px 24px",
    },
  },
  number: {
    display: "inline-block",
    fontSize: 20,
    color: "#2caeba",
    marginBottom: "14px",
  },
  tag_container: {
    margin: "18px 0 0",
    display: "flex",
    flexWrap: "nowrap",
    [theme.breakpoints.down("xs")]: {
      margin: "12px 0 0",
    },
  },
  tag: {
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
  button: {
    width: 180,
    display: "flex",
    justifyContent: "center",
    margin: "66px auto 0",
    [theme.breakpoints.down("xs")]: {
      margin: "24px auto 0",
    },
  },
  readBtn: {
    float: "right",
    position: "relative",
    right: 10,
    color: theme.palette.text.main,
    cursor: "pointer",
    // borderBottom: `1px solid ${theme.palette.text.main}`
    "&:hover": {
      color: theme.palette.text.hover,
    },
  },
});

const Project = () => {
  const classes = useStyles();
  const router = useRouter();

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);

  const [clientWidth, setClientWidth] = useState();

  const validateSeq = (index, odd, even) => {
    if ((index + 1) % 2 === 0) {
      return even;
    }
    return odd;
  };

  useEffect(() => {
    loadProjects(dispatch);
  }, [dispatch]);

  useEffect(() => setClientWidth(document.body.clientWidth <= 600), []);

  const mobileTagGroup = (project) => project.tags
    .filter((t, i) => i < 3)
    .map((tag, index) => (
        <div className={classes.tag} key={index}>
          {tag.name}
        </div>
    ));

  const webTagGroup = (project) => project.tags.map((tag, index) => (
      <div className={classes.tag} key={index}>
        {tag.name}
      </div>
  ));

  return (
    <section className={classes.root} id="Projects-section">
      <div className={classes.container}>
        <Title title="Featured Projects" />
        {!projects.loading
          && projects.payload
            .filter((project) => project.featured === true)
            .map((project, index) => (
              <div className={classes.project} key={index}>
                <div
                  className={validateSeq(
                    index,
                    classes.image_odd,
                    classes.image_even,
                  )}
                >
                  <img src={project.image} className={classes.image} />
                </div>
                <div
                  className={validateSeq(
                    index,
                    classes.info_odd,
                    classes.info_even,
                  )}
                >
                  <span className={classes.number}>{project.number}.</span>
                  <Typography variant="h4" className={classes.title}>
                    {project.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    className={classes.description}
                  >
                    {project.description.slice(0, 53)}
                    {project.description.length >= 60 ? (
                      <>
                        <span> ...</span>{" "}
                        <div className={classes.readBtn}>( Read More... )</div>
                      </>
                    ) : (
                      ""
                    )}
                  </Typography>
                  <div className={classes.tag_container}>
                    {clientWidth ? (
                      <>
                        {mobileTagGroup(project)}
                        {project.tags.length <= 3 ? null : (
                          <div className={classes.tag}> + </div>
                        )}
                      </>
                    ) : (
                      webTagGroup(project)
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
      <div className={classes.button}>
        <MButton
          text="MORE PROJECTS"
          onClick={() => router.push("/projects")}
        />
      </div>
    </section>
  );
};

export default Project;
