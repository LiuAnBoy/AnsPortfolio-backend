import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "../styles/theme";
import Title from "../components/shared/title";
import ProjectShowSection from "../components/layout/ProjectShowSection";
import { loadProjects } from "../store/actions/project";
import { loadTags } from "../store/actions/tag";
import Helmet from "../components/shared/helmet";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    maxWidth: "100%",
    padding: "120px 0 60px",
    backgroundColor: "#e0fcff",
    [theme.breakpoints.down("xs")]: {
      padding: "100px 0 30px",
    },
  },
});

const ProjectsPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    loadProjects(dispatch);
  }, [dispatch]);

  useEffect(() => {
    loadTags(dispatch);
  }, [dispatch]);

  const projects = useSelector((state) => state.projects);
  const tags = useSelector((state) => state.tags);

  return (
    <>
      <Helmet subtitle="Projects" siteTitle="Projects" siteURL="projects" />
      <div className={classes.root}>
        <Title title="Projects" />
        <ProjectShowSection projects={projects} tags={tags} />
      </div>
    </>
  );
};

export default ProjectsPage;
