import { Link } from "react-router-dom";
import "../styles/pages/Home.css";

function Home() {
  return (
    <div className="home">
      <video
        src="/media/videos/auth-background-white-mode.mp4"
        autoPlay
        muted
        loop
        className="home__background"
      ></video>
      <p className="home__title">ConMan</p>
      <p className="home__quote">
        We manage your containers because no we can manage them better!
      </p>
      <div className="home__links">
        <Link to={`/auth/login`} className="home__link">
          Log in
        </Link>
        <Link to={`/auth/signup`} className="home__link">
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Home;
