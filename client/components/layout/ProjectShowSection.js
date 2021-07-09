import React, { useState } from "react";
import Fuse from "fuse.js";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import { theme } from "../../styles/theme";
import ProjectBlock from "../shared/projectBlock";

const useStyles = makeStyles({
  root: {
    width: "91.4vw",
    padding: "0",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    [theme.breakpoints.down("xs")]: {},
  },
  tag_section: {
    padding: "12px 24px",
    "& > div": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    "& > div > h4": {
      fontSize: 18,
      margin: 0,
      letterSpacing: 1,
      display: "inline-block",
    },
    "& > div > ul": {
      // paddingLeft: 12,
      padding: 0,
      display: "inline-block",
      height: 29,
      [theme.breakpoints.down("xs")]: {
        display: "block",
        height: "initial",
        marginBottom: 12,
      },
    },
    "& > hr": {
      height: 4,
      border: 0,
      backgroundColor: theme.palette.primary.dark,
    },
  },
  projects_section: {
    padding: "12px 24px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 24,
    minHeight: 497,
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "1fr",
    },
  },
  tag_label_unchecked: {
    margin: "0 10px 10px 0",
    backgroundColor: "#dae2ec",
    color: "#617d98",
    padding: "6px 10px",
    display: "inline-block",
    borderRadius: "2px",
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontSize: 12,
    cursor: "pointer",
  },
  tag_label_checked: {
    margin: "0 10px 10px 0",
    backgroundColor: "#617d98",
    color: theme.palette.primary.light,
    padding: "6px 10px",
    display: "inline-block",
    borderRadius: "2px",
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontSize: 12,
    cursor: "pointer",
  },
  tag_checkbox: {
    visibility: "hidden",
    position: "absolute",
    right: 0,
    appearance: "none",
  },
  tag_skeleton: {
    margin: "0 10px 10px 0",
    backgroundColor: "#dae2ec",
    display: "inline-block",
    borderRadius: "2px",
    width: 88,
    height: 29,
  },
  project_skeleton: {
    backgroundColor: "#dae2ec",
    height: 350,
    [theme.breakpoints.down("xs")]: {
      height: 250,
    },
  },
});

const ProjectShowSection = ({ projects, tags }) => {
  const classes = useStyles();

  const [tagOption, setTagOption] = useState([]);
  // TODO Tags Array length
  const [checkedStatus, setCheckedStatus] = useState(new Array(12).fill(false));

  const handleChecked = (position) => {
    const updatedCheckedStatus = checkedStatus
      .map((item, idx) => (idx === position ? !item : item));

    setCheckedStatus(updatedCheckedStatus);

    const tagIndex = tags.payload[position].name;
    const arrIndex = checkedStatus[position];

    if (!arrIndex) {
      setTagOption((prevArr) => [...prevArr, { "tags.name": tagIndex.toLowerCase() }]);
    } else {
      const idx = tagOption.indexOf(tagIndex);
      tagOption.splice(idx, 1);
    }
  };

  const options = {
    includeScore: true,
    useExtendedSearch: true,
    shouldSort: true,
    keys: ["tags.name"],
  };

  const fuse = new Fuse(projects.payload || [], options);

  const result = fuse.search({ $and: tagOption });

  return (
    <div className={classes.root}>
      <div className={classes.tag_section}>
        <div>
          <h4>Tag:</h4>
          <ul>
            {(tags.loading ? Array.from(new Array(8)) : tags.payload).map((tag, tidx) => (tag ? (
                <label
                  key={tidx}
                  className={
                    checkedStatus[tidx] ? classes.tag_label_checked : classes.tag_label_unchecked
                  }
                >
                  <input
                    type="checkbox"
                    name={tag.name}
                    checked={checkedStatus[tidx]}
                    value={tag.name}
                    onChange={() => handleChecked(tidx)}
                    className={classes.tag_checkbox}
                  />
                  {tag.name}
                </label>
            ) : (
                <Skeleton key={tidx} variant={"rect"} className={classes.tag_skeleton} />
            )))}
          </ul>
        </div>
        <hr />
      </div>
      <section className={classes.projects_section}>
        {tagOption.length > 0
          ? result
            && result.map((item, rIdx) => (
              <ProjectBlock
                key={rIdx}
                title={item.item.name}
                img={item.item.image}
                company={item.item.company}
              />
            ))
          : (projects.loading ? Array.from(new Array(9)) : projects.payload).map((project, idx) => (
            project ? (
                <ProjectBlock
                  key={project._id}
                  title={project.name}
                  img={project.image}
                  company={project.company}
                />
            ) : (
                <Skeleton key={idx} variant={"rect"} className={classes.project_skeleton} />
            )))}
      </section>
    </div>
  );
};

export default ProjectShowSection;
