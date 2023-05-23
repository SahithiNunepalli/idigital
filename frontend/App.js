import React, { useContext, useEffect } from "react";
import { Container } from "@mui/system";
import { useState } from "react";
import ItemList from "./components/ItemList";
import Login from "./components/login-register/Login";
import SearchBar from "./components/header/SearchBar";
import Register from "./components/login-register/Register";
import Sell from "./components/Sell";
import Profile from "./components/profile/Profile";
import { logout } from "./connections/login-register";
import { NAV_CLICK_ACTION } from "./nav-actions";
import { NavContext } from "./contexts/NavContext";
import { AuthContext } from "./contexts/AuthContext";
import Head from "next/head";

export default function App() {
  const { navAction } = useContext(NavContext);
  const { authToken, setLogin } = useContext(AuthContext);

  const [enableSearchBar, setEnableSearchBar] = useState(false);
  const [canEnableSearchBar, setCanEnableSearchBar] = useState(true);
  const [component, setComponent] = useState(<ItemList />);

  const handleNavClick = (action) => {
    switch (action) {
      case NAV_CLICK_ACTION.HOME:
        setCanEnableSearchBar(true);
        setComponent(<ItemList callback={handleNavClick} />);
        break;

      case NAV_CLICK_ACTION.SEARCH_ON:
      case NAV_CLICK_ACTION.SEARCH_OFF:
        if (canEnableSearchBar) setEnableSearchBar(!enableSearchBar);
        break;
      case NAV_CLICK_ACTION.SELL:
        setEnableSearchBar(false);
        setCanEnableSearchBar(false);

        setComponent(<Sell callback={handleNavClick} />);
        break;
      case NAV_CLICK_ACTION.LOGIN:
        setEnableSearchBar(false);
        setCanEnableSearchBar(false);

        setComponent(<Login callback={handleNavClick} />);
        break;

      case NAV_CLICK_ACTION.REGISTER:
        setEnableSearchBar(false);
        setCanEnableSearchBar(false);

        setComponent(<Register callback={handleNavClick} />);
        break;

      case NAV_CLICK_ACTION.PROFILE:
        setEnableSearchBar(false);
        setCanEnableSearchBar(false);

        setComponent(<Profile callback={handleNavClick} />);
        break;

      case NAV_CLICK_ACTION.LOGOUT:
        setLogin({ userid: "", token: "" });
        handleNavClick(NAV_CLICK_ACTION.HOME);
        break;
    }
  };

  useEffect(() => {
    handleNavClick(navAction);
  }, [navAction]);

  return (
    <>
      <Head>
        <style>{`
          body {
            background-color: transparent;
          }

          .background-image {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
          }
        `}</style>
      </Head>
      <Container maxWidth="lg">
        {enableSearchBar ? <SearchBar /> : null}
        {component}
        
      </Container>
      <img className="background-image" src="background.jpg" alt="Background" />
    </>
  );
}
