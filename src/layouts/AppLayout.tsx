import { useContextValue } from "../context/StateProvider";
import Navbar from "../components/Navbar";
import { Fragment, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { actionTypes } from "../context/reducer";
import jwtDecode from "jwt-decode";
import { paths } from "../router/paths";

function AppLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [{ user }, dispatch] = useContextValue();

  useEffect(() => {
    if (!user) {
      const localStorageUser = localStorage.getItem(`user`);
      if (localStorageUser) {
        dispatch({
          type: actionTypes.SET_USER,
          payload: {
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
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
}

export default AppLayout;
