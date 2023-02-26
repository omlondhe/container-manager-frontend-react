import { Link, useLocation } from "react-router-dom";
import "../styles/components/Navbar.css";
import { Fragment } from "react";
import { useContextValue } from "../context/StateProvider";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import { IconButton } from "@mui/material";
import Space from "./Space";
import { paths } from "../router/paths";
import { actionTypes } from "../context/reducer";
import { MODE } from "../context/types";
import LightModeIcon from "@mui/icons-material/LightModeRounded";
import DarkModeIcon from "@mui/icons-material/DarkModeRounded";

function Navbar() {
  const { pathname } = useLocation();
  const [{ user, mode }, dispatch] = useContextValue();

  function logout() {
    localStorage.removeItem(`user`);
    dispatch({
      type: actionTypes.REMOVE_USER,
    });
  }

  function changeMode() {
    localStorage.setItem(`mode`, mode === MODE.light ? "dark" : "light");
    dispatch({
      type: actionTypes.CHANGE_MODE,
      mode: mode === MODE.dark ? MODE.light : MODE.dark,
    });
  }

  return (
    <nav
      className={`navbar ${
        mode === MODE.light ? "navbar__light" : "navbar__dark"
      }`}
    >
      <div className="navbar__title__section">
        <span
          className={`navbar__title ${
            mode === MODE.light ? "navbar__title__light" : "navbar__title__dark"
          }`}
        >
          ConMan
        </span>
        <span
          className={`navbar__subtitle ${
            mode === MODE.light
              ? "navbar__subtitle__light"
              : "navbar__subtitle__dark"
          }`}
        >
          Manage all your containers!
        </span>
      </div>
      <div className="navbar__actions">
        {pathname === paths.login ||
        pathname === paths.signup ||
        (pathname === paths.home && !user) ? (
          pathname === paths.home ? (
            <Fragment>
              <Link
                to={`/auth/login`}
                className={`navbar__link ${
                  mode === MODE.light
                    ? "navbar__link__light"
                    : "navbar__link__dark"
                }`}
              >
                Log in
              </Link>
              <Link
                to={`/auth/signup`}
                className={`navbar__link ${
                  mode === MODE.light
                    ? "navbar__link__light"
                    : "navbar__link__dark"
                }`}
              >
                Sign up
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Link
                to={`/`}
                className={`navbar__link ${
                  mode === MODE.light
                    ? "navbar__link__light"
                    : "navbar__link__dark"
                }`}
              >
                Home
              </Link>
              {pathname === paths.login ? (
                <Link
                  to={`/auth/signup`}
                  className={`navbar__link ${
                    mode === MODE.light
                      ? "navbar__link__light"
                      : "navbar__link__dark"
                  }`}
                >
                  Sign up
                </Link>
              ) : (
                <Link
                  to={`/auth/login`}
                  className={`navbar__link ${
                    mode === MODE.light
                      ? "navbar__link__light"
                      : "navbar__link__dark"
                  }`}
                >
                  Log in
                </Link>
              )}
            </Fragment>
          )
        ) : (
          <Fragment>
            {pathname === paths.history ? (
              <Link
                to={`/dashboard`}
                className={`navbar__link ${
                  mode === MODE.light
                    ? "navbar__link__light"
                    : "navbar__link__dark"
                }`}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to={`/history`}
                className={`navbar__link ${
                  mode === MODE.light
                    ? "navbar__link__light"
                    : "navbar__link__dark"
                }`}
              >
                History
              </Link>
            )}
            <Space width={7} />
            <IconButton onClick={logout}>
              <LogoutIcon color="error" />
            </IconButton>
          </Fragment>
        )}
        <IconButton onClick={changeMode}>
          {mode === MODE.dark ? (
            <LightModeIcon style={{ color: "white" }} />
          ) : (
            <DarkModeIcon style={{ color: "black" }} />
          )}
        </IconButton>
      </div>
    </nav>
  );
}

export default Navbar;
