import { Link } from "react-router-dom";
import "../styles/pages/Home.css";
import { useContextValue } from "../context/StateProvider";
import { MODE } from "../context/types";

function Home() {
  const [{ mode }] = useContextValue();

  return (
    <div className="home">
      {mode === MODE.light ? (
        <video
          autoPlay
          muted
          loop
          className="home__background"
          src="https://ik.imagekit.io/omlondhe/auth-background-light-mode.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1677862300903"
        />
      ) : (
        <video
          autoPlay
          muted
          loop
          className="home__background"
          src="https://ik.imagekit.io/omlondhe/auth-background-dark.mp4?ik-sdk-version=javascript-1.4.3&updatedAt=1677862303640"
        />
      )}
      <p
        className={`home__title ${
          mode === MODE.dark ? "home__title__dark" : "home__title__light"
        }`}
      >
        ConMan
      </p>
      <p
        className={`home__quote ${
          mode === MODE.dark ? "home__quote__dark" : "home__quote__light"
        }`}
      >
        We manage your containers because no we can manage them better!
      </p>
      <div className="home__links">
        <Link
          to={`/auth/login`}
          className={`home__link ${
            mode === MODE.dark ? "home__link__dark" : "home__link__light"
          }`}
        >
          Log in
        </Link>
        <Link
          to={`/auth/signup`}
          className={`home__link ${
            mode === MODE.dark ? "home__link__dark" : "home__link__light"
          }`}
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Home;
