import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box, Tabs, Tab, Typography,
} from "@material-ui/core";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import { useDispatch, useSelector } from "react-redux";
import { loadExperience } from "../../store/actions/experience";
import Title from "../shared/title";
import { theme } from "../../styles/theme";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    maxWidth: "100%",
    padding: "60px 0",
    backgroundColor: theme.palette.background.secondary,
    [theme.breakpoints.down("xs")]: {
      padding: "36px 0",
    },
  },
  container: {
    width: 1200,
    margin: "0 auto",
    padding: "20px 0 10px",
    [theme.breakpoints.down("md")]: {
      width: "100vw",
    },
    [theme.breakpoints.down("xs")]: {
      width: "87.8vw",
    },
  },
  experience: {
    width: "75%",
    display: "flex",
    flexDirection: "row",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "87.8vw",
      flexDirection: "column",
    },
  },
  tab: {
    fontSize: 16,
    marginRight: "26px",
    letterSpacing: 2,
    "&:hover": {
      color: theme.palette.text.hover,
    },
    [theme.breakpoints.down("xs")]: {
      margin: " 0 auto",
    },
  },
  tabs: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: " 0 auto",
    },
  },
  position: {
    color: "#102a42",
    margin: "0 0 8px",
    letterSpacing: 4,
  },
  company_name: {
    margin: "0 0 10px",
    backgroundColor: "#dae2ec",
    color: "#617d98",
    padding: "6px 12px",
    display: "inline-block",
    borderRadius: "2px",
    fontWeight: 700,
    letterSpacing: 2,
    textTransform: "uppercase",
    fontSize: 12,
  },
  date: {
    color: "#324d67",
    letterSpacing: 4,
    margin: "6px 0",
    fontSize: 14,
  },
  desss: {
    display: "flex",
    alignItems: "center",
  },
  description: {
    margin: "10px 30px",
    fontSize: 16,
    letterSpacing: 2,
    fontWeight: 400,
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
      margin: "10px 12px 10px 18px",
    },
  },
  icon: {
    fontSize: 12,
    color: theme.palette.primary.dark,
  },
  tabpanel: {
    paddingTop: 0,
    marginLeft: "100px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "50px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      padding: "2vw",
      margin: "30px auto 0",
    },
  },
});

const TabPanel = (props) => {
  const {
    children, value, index, ...other
  } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${ index }`}
      aria-labelledby={`vertical-tab-${ index }`}
      {...other}
      style={{ width: "100%", padding: "0" }}
    >
      {value === index && (
        <Box
          // p={3}
          className={classes.tabpanel}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => ({
  id: `vertical-tab-${ index }`,
  "aria-controls": `vertical-tabpanel-${ index }`,
});

const Experience = () => {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const [clientWidth, setClientWidth] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => setClientWidth(document.body.clientWidth <= 600), []);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.experience);

  useEffect(() => {
    loadExperience(dispatch);
  }, [dispatch]);

  return (
    <section className={classes.root} id="About-section">
      <div className={classes.container}>
        <Title title="Experience" />
        <div className={classes.experience}>
          <Tabs
            orientation={clientWidth ? "horizontal" : "vertical"}
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
            TabIndicatorProps={{ style: { backgroundColor: "#2caeba" } }}
          >
            {data.experience
              && data.experience.map((exp, index) => (
                <Tab
                  label={exp.company}
                  {...a11yProps(index)}
                  className={classes.tab}
                  key={index}
                />
              ))}
          </Tabs>
          {data.experience
            && data.experience.map((item, index) => (
              <TabPanel value={value} index={index} key={index}>
                <Typography variant="h5" className={classes.position}>
                  {item.position}
                </Typography>
                <div className={classes.company_name}>{item.company}</div>
                <Typography variant="subtitle1" className={classes.date}>
                  {item.start} - {item.now ? "NOW" : item.end}
                </Typography>
                {item.description.map((des, idx) => (
                  <div className={classes.desss} key={idx}>
                    <DoubleArrowIcon className={classes.icon} />
                    <Typography variant="subtitle2" className={classes.description}>
                      {des}
                    </Typography>
                  </div>
                ))}
              </TabPanel>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
