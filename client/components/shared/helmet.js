import React from "react";
import Head from "next/head";
import { theme } from "../../styles/theme";

const Meta = ({
  subtitle, siteTitle, siteDescription, siteImage, siteURL, siteName, siteType,
}) => (
  <Head>
    <title>An&apos;s Portfolio | {subtitle || ""}</title>
    <meta name="description" content="LUANS PORTFOLIO" />
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="theme-color" content={theme.palette.primary.main} />
    <link rel="shortcut icon" href={"https://res.cloudinary.com/cla/image/upload/v1625983074/Portfolio/favicon_b4bbop.svg"} />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />

    <meta data-n-head="ssr" property="og:type" content={siteType || "website"} />
    <meta data-n-head="ssr" property="og:title" content={`An's Portfolio | ${ siteTitle || "" }`} />
    <meta
      data-n-head="ssr"
      property="og:description"
      content={siteDescription || "Hi, I'm Eric. Freelance Front-End Developer and UI/UX Designer."}
    />
    <meta data-n-head="ssr" property="og:image" content={siteImage || "https://res.cloudinary.com/cla/image/upload/v1625984174/Portfolio/favicon_kue56d.png"}/>
    <meta
      data-n-head="ssr"
      property="og:url"
      content={`https://www.luansportfolio.com/${ siteURL || "" }`}
    />
    <meta data-n-head="ssr" property="og:site_name" content={siteName || "An's Portfolio"} />
    <meta name="google-site-verification" content="F5rdRdT9MMGGttcsEZZCT4-ZZvNGKwxVfDW3bi9zA2Y" />
  </Head>
);

export default Meta;
