import Head from "next/head";
import { SnackbarProvider } from "notistack";
import { CacheProvider } from "@emotion/react";
import { Analytics } from "@vercel/analytics/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import muiTheme from "@source/muiTheme";
import Loading from "@component/shared/loading";
import { AccountsLayout, styles } from ".";
import BuilderCookieNoticeContainer from "@component/shared/cookieNotice/BuilderCookieNoticeContainer";

import { ILayout } from "@interface/main/layout-interface";
import BuilderFooterContainer from "@component/shared/footer/FooterContainer";
import HeaderContainer from "@component/shared/header";

const Layout = ({ loading, emotionCache, theme, displayHeader, authenticated, Component, layout, pageProps }: any) => (
  <>
    <Head>
      <title>SoccerMASS: The Leading Soccer Management Solution and Football API Supplier.</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#448b44" />
      <meta name="theme-color" content="#448b44" />

      <meta name="robots" content="index, follow" />
      <meta property="og:type" content="website" />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="1024" />
      <meta property="og:image:type" content="image/png" />
      <meta name="theme-color" content={muiTheme(theme).palette.primary.main} />
      <meta property="og:url" content="https://www.soccermass.com/" />
      <meta name="keywords" content="soccer manager, soccer, soccermass, football manager, football" />
      <meta httpEquiv="Content-Type" content="text/html; charSet=utf-8" />
      <meta property="og:image" content="/images/layout/soccermass.webp" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="SoccerMASS leads the way as the top Online Football Management Game and provider of Football data APIs, offering cutting-edge formations, tactics, a lifelike transfer market and so much more."
      />
      <meta property="og:title" content={`SoccerMASS: Soccer Manager ${new Date().getFullYear()}`} />
      <meta
        property="og:description"
        content="SoccerMASS leads the way as the top Online Football Management Game and provider of Football data APIs, offering cutting-edge formations, tactics, a lifelike transfer market and so much more."
      />
    </Head>

    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={muiTheme(theme)}>
        <CssBaseline /> {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <SnackbarProvider maxSnack={2} preventDuplicate anchorOrigin={{ horizontal: "right", vertical: "top" }}>
          <HeaderContainer position="sticky" />
          <main className={styles.layout}>
            {layout === "accounts" ? (
              <AccountsLayout Component={Component} pageProps={pageProps} loading={loading} />
            ) : (
              <main className={styles.layout}>{loading ? <Loading /> : <Component {...pageProps} />}</main>
            )}
            <BuilderFooterContainer />
          </main>
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>

    {process.env.NODE_ENV === "production" && <Analytics />}
  </>
);

export default Layout;
