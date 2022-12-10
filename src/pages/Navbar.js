import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/login">Log In</NavLink>
      {/* <NavLink to="/get_started">Get Started</NavLink> */}
    </header>
  );
}
