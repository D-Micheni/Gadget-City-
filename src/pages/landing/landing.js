import "./landing.css";
import { Link } from "react-router-dom";
import SliderShow from "./slideshow";

export default function Landing() {
  return (
    <main id="landing">
      <section id="landing-header">
        <div id="landing-header1">
          <span id="landing-title">Gadget Center</span>
        </div>
        <div id="landing-button">
          <Link to="/getstarted">Get Started</Link>
        </div>
      </section>

      <section id="landing-footer"></section>
    </main>
  );
}
