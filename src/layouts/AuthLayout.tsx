import { Outlet, useNavigate } from "react-router-dom";
import "../styles/layouts/AuthLayout.css";
import { Fragment, useEffect } from "react";
import { TypeOptions } from "react-toastify/dist/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContextValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";
import jwtDecode from "jwt-decode";
import { MODE } from "../context/types";

function AuthLayout() {
  const navigate = useNavigate();
  const [{ user, mode }, dispatch] = useContextValue();

  useEffect(() => {
    if (!user) {
      const localStorageUser = localStorage.getItem(`user`);
      if (localStorageUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: {
            ...jwtDecode(localStorageUser),
            token: localStorageUser,
          },
        });
        navigate(`/dashboard`, { replace: true });
      }
    }
  }, [user]);

  function showToast(toastMessage: string, toastType: TypeOptions) {
    toast(toastMessage, {
      type: toastType,
    });
  }

  return (
    <Fragment>
      {mode === MODE.light ? (
        <video
          src={
            "https://drive.google.com/file/d/1r8wx1kOrZoa5fGZ5oyCBPO8ZVuDE5D5L/view?usp=sharing"
          }
          autoPlay
          muted
          loop
          className="home__background"
        />
      ) : (
        <video
          src={
            "https://drive.google.com/file/d/18Q4HnrC_ayC6x-FS2ogJs0Pco14q-uDU/view?usp=sharing"
          }
          autoPlay
          muted
          loop
          className="home__background"
        />
      )}
      <div className="authLayout">
        <section
          className={`authLayout__section ${
            mode === MODE.light
              ? "authLayout__section__light"
              : "authLayout__section__dark"
          }`}
        >
          <Outlet context={{ showToast }} />
        </section>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={mode === MODE.light ? "light" : "dark"}
      />
    </Fragment>
  );
}

export default AuthLayout;
