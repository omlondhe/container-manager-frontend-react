import { Link } from "react-router-dom";
import "../styles/pages/Home.css";
import { useContextValue } from "../context/StateProvider";
import { MODE } from "../context/types";

function Home() {
  const [{ mode }] = useContextValue();
  console.log(mode);
  return (
    <div className="home">
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
