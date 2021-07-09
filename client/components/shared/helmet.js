import React from "react";
import Head from "next/head";
import { theme } from "../../styles/theme";

const Meta = ({
  subtitle, siteTitle, siteDescription, siteImage, siteURL, siteName, siteType,
}) => (
  <Head>
    <title>An&apos;s Portfolio | {subtitle}</title>
    <meta name="description" content="LUANS PORTFOLIO" />
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <meta name="theme-color" content={theme.palette.primary.main} />
    {/* <meta
      data-n-head="ssr"
      property="og:image"
      content={"https://digispace-dev.elk-tree.site/xr-logo/xr-purple.svg"}
    /> */}
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />

    <meta data-n-head="ssr" property="og:type" content={siteType || "website"} />
    <meta data-n-head="ssr" property="og:title" content={`An's Portfolio | ${ siteTitle }`} />
    <meta
      data-n-head="ssr"
      property="og:description"
      content={siteDescription || "Hi, I'm Eric. Freelance Front-End Developer and UI/UX Designer."}
    />
    <meta data-n-head="ssr" property="og:image" content={siteImage} />
    <meta
      data-n-head="ssr"
      property="og:url"
      content={`https://www.luansportfolio.com/${ siteURL }`}
    />
    <meta data-n-head="ssr" property="og:site_name" content={siteName || "An's Portfolio"} />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
);

export default Meta;
