import { useContextValue } from "../context/StateProvider";
import Navbar from "../components/Navbar";
import { Fragment, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { actionTypes } from "../context/reducer";
import jwtDecode from "jwt-decode";
import { paths } from "../router/paths";
import { ThemeProvider, createTheme } from "@mui/material";
import { MODE } from "../context/types";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function AppLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [{ user, mode }, dispatch] = useContextValue();

  useEffect(() => {
    if (!user) {
      const localStorageUser = localStorage.getItem(`user`);
      const localStorageMode = localStorage.getItem(`mode`);

      dispatch({
        type: actionTypes.CHANGE_MODE,
        mode: localStorageMode
          ? localStorageMode === "dark"
            ? MODE.dark
            : MODE.light
          : MODE.light,
      });

      if (localStorageUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: {
            ...jwtDecode(localStorageUser),
            token: localStorageUser,
          },
        });
        if (pathname !== paths.dashboard && pathname !== paths.history) {
          navigate(`/dashboard`, { replace: true });
        }
      }
    } else if (pathname !== paths.dashboard && pathname !== paths.history) {
      navigate(`/dashboard`, { replace: true });
    }
  }, [user, pathname, navigate, dispatch]);

  return (
    <ThemeProvider theme={mode === MODE.light ? lightTheme : darkTheme}>
      <Navbar />
      <Outlet />
    </ThemeProvider>
  );
}

export default AppLayout;
