"use client";

import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { INIT_PROFILE } from "@lib/constants";
import { setThemeAction } from "@store/actions/account";

const Header = dynamic(() => import("./header-view"));
interface HeaderContainerProps {
  profile: Profile;
  deviceWidth: number;
  displayHeader: boolean;
  authenticated: boolean;
  setThemeAction: Function;
  position: "relative" | "sticky";
}

const HeaderContainer = (props: HeaderContainerProps) => {
  //  accountsService = new AccountsService(),
  //   { enqueueSnackbar } = useSnackbar(),

  const { setTheme, theme } = useTheme(),
    { position, setThemeAction } = props,
    [showNav, setShowNav] = useState(false),
    [profile, setProfile] = useState<Profile>(INIT_PROFILE),
    [displayHeader, setDisplayHeader] = useState<boolean>(false),
    [authenticated, setAuthenticated] = useState<boolean>(false),
    className = position === "relative" ? "relativeHeader" : displayHeader ? "stickyHeader" : "hiddenHeader";

  useEffect(() => {
    if (displayHeader != props.displayHeader) {
      setDisplayHeader(props.displayHeader!);
    }
  }, [props.displayHeader]);

  useEffect(() => {
    setProfile(props.profile);
    setAuthenticated(props.authenticated);
  }, [props.profile, props.authenticated]);

  useEffect(() => {
    // Regex to match relativeHeader ignoring ID react will attach to module.scss
    const headerElement = document.querySelector(`[class*="${className}"`);

    if (headerElement instanceof HTMLElement) {
      const offsetWidth = headerElement.offsetWidth;
      setShowNav(offsetWidth > 850);
    }
  }, [props.deviceWidth]);

  const themeHandler = (theme: Theme) => () => {
    setTheme(theme);
    setThemeAction(theme);

    // if (authenticated)
    //   await accountsService
    //     .setTheme({ theme: newTheme })
    //     .catch(() => enqueueSnackbar("Failed to save new theme across profile", { variant: "error" }));
  };

  return <Header {...{ className, authenticated, theme: theme as Theme, profile, themeHandler, showNav }} />;
};

const mapStateToProps = (state: RootState) => ({
    profile: state.account.profile,
    deviceWidth: state.layout.width,
    displayHeader: state.layout.displayHeader,
    authenticated: state.account.authenticated,
  }),
  mapDispatchToProps = { setThemeAction };

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
