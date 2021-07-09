import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import { Typography } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import { useRouter } from "next/router";
import MailIcon from "@material-ui/icons/Mail";
import { theme } from "../styles/theme";
import Title from "../components/shared/title";
import { loadProfile } from "../store/actions/profile";
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
  container: {
    width: "70%",
    height: "75%",
    margin: "60px auto 0",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      width: "80vw",
    },
  },
  avatar_section: {
    width: "40%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  avatar: {
    width: 450,
    height: 450,
    [theme.breakpoints.down("xs")]: {
      width: 280,
      height: 280,
    },
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 999,
  },
  load_image: {
    width: 350,
    height: 350,
    borderRadius: 999,
    [theme.breakpoints.down("xs")]: {
      width: 230,
      height: 230,
    },
  },
  info_section: {
    width: "60%",
    padding: "32px 48px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      padding: "12px 0 32px",
    },
  },
  name: {
    fontWeight: 500,
    letterSpacing: 1.2,
    color: theme.palette.text.main,
  },
  name_loading: {
    width: 240,
  },
  position: {
    margin: "8px 0 0",
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
  position_loading: {
    margin: "8px 0 0",
    width: 80,
    height: 30,
  },
  description: {
    margin: "24px 0",
    fontSize: 18,
    letterSpacing: 1.2,
  },
  description_loading: {
    height: 30,
  },
  skill: {
    margin: "6px 6px 0 0",
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
  skill_loading: {
    width: 72,
    display: "inline-block",
    marginTop: 6,
    marginRight: 6,
    height: 28,
  },
  social_group: {
    margin: "18px 0",
    display: "flex",
    flexDirection: "row",
    "& > a": {
      cursor: "pointer",
    },
    "& > div": {
      cursor: "pointer",
    },
  },
  github_icon: {
    fontSize: 28,
    marginRight: 6,
    color: theme.palette.primary.dark,
  },
  icon_loading: {
    width: 28,
    height: 28,
    marginRight: 6,
  },
  linkedin_icon: {
    fontSize: 32,
    marginRight: 6,
    color: theme.palette.primary.dark,
  },
  mail_icon: {
    fontSize: 32,
    marginRight: 6,
    color: theme.palette.primary.dark,
  },
  line: {
    position: "relative",
    top: 4,
    marginLeft: 18,
    fontSize: 18,
  },
  line_loading: {
    width: 100,
    height: 28,
    marginLeft: 18,
  },
});

const About = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    loadProfile(dispatch);
  }, [dispatch]);

  return (
    <>
      <Helmet
        subtitle="About Me"
        siteTitle="About Me"
        siteURL="about-me"
        siteImage="https://res.cloudinary.com/cla/image/upload/v1625750851/Portfolio/AN/hero-img-2_gj6mkz.png"
        siteDescription="我是一名熱愛學習新技術的前端工程師，透過幾個案子的經驗累積，學到了React, Vue, Python等程式語言，也透過觀看大量網站和學習Ai, PS等設計出符合客戶風格需求的網站。"
      />
      <div className={classes.root}>
        <Title title="About Me" />
        {profile.loading ? (
          <div className={classes.container}>
            <div className={classes.avatar_section}>
              <div>
                <Skeleton variant="rect" className={classes.load_image} />
              </div>
            </div>
            <div className={classes.info_section}>
              <Typography variant="h2">
                <Skeleton variant="text" className={classes.name_loading} />
              </Typography>
              <div>
                <Skeleton variant="rect" className={classes.position_loading} />
              </div>
              <Typography variant="body1" className={classes.description}>
                <Skeleton variant="rect" className={classes.description_loading} />
              </Typography>
              <Typography variant="body1" className={classes.description}>
                <Skeleton variant="rect" className={classes.description_loading} />
              </Typography>
              <Typography variant="body1" className={classes.description}>
                <Skeleton variant="rect" className={classes.description_loading} />
              </Typography>
              <Typography variant="body1" className={classes.description}>
                <Skeleton variant="rect" className={classes.description_loading} />
              </Typography>
              <Typography variant="subtitle1">SKILLS：</Typography>
              <div>
                {Array.from(new Array(5)).map((item, idx) => (
                  <Skeleton key={idx} variant="rect" className={classes.skill_loading} />
                ))}
              </div>
              <div className={classes.social_group}>
                <a>
                  <Skeleton variant="rect" className={classes.icon_loading} />
                </a>
                <a>
                  <Skeleton variant="rect" className={classes.icon_loading} />
                </a>
                <div>
                  <Skeleton variant="rect" className={classes.icon_loading} />
                </div>
                <Typography variant="subtitle1">
                  <Skeleton variant="rect" className={classes.line_loading} />
                </Typography>
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.container}>
            <div className={classes.avatar_section}>
              <div className={classes.avatar}>
                <img src={profile.payload.avatar} className={classes.image} />
              </div>
            </div>
            <div className={classes.info_section}>
              <Typography variant="h2" className={classes.name}>
                {profile.payload.name}
              </Typography>
              <div className={classes.position}>{profile.payload.position}</div>
              <Typography variant="body1" className={classes.description}>
                {profile.payload.description}
              </Typography>
              <Typography variant="subtitle1">SKILLS：</Typography>
              <div>
                {profile.payload.skills.map((skill, idx) => (
                  <div key={idx} className={classes.skill}>
                    {skill}
                  </div>
                ))}
              </div>
              <div className={classes.social_group}>
                <a
                  href={`${ profile.payload.social.github }`}
                  target="_blank"
                  rel="noreferrer noopner"
                >
                  <GitHubIcon className={classes.github_icon} />
                </a>
                <a
                  href={`${ profile.payload.social.linkedin }`}
                  target="_blank"
                  rel="noreferrer noopner"
                >
                  <LinkedInIcon className={classes.linkedin_icon} />
                </a>
                <div onClick={() => router.push("/contact")}>
                  <MailIcon className={classes.mail_icon} />
                </div>
                <Typography variant="subtitle1" className={classes.line}>
                  Line: {profile.payload.lineId}
                </Typography>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default About;
