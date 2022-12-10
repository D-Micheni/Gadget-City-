import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Getstarted({ onLogin }) {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [passwordconfirm, setPasswordConfirm] = useState("");
  let [errors, setErrors] = useState("");
  let [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("https://gadgets-production.up.railway.app/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        password_confirmation: passwordconfirm,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user);
          navigate("/products");
        });
      } else {
        r.json().then((err) => {
          setErrors(err.errors);
          console.log(errors);
        });
      }
    });
  }



  return (
    <main id="get-started">
      <form id="login-form" onSubmit={handleSubmit}>
        <span className="login-form-name">Get Started</span>
        <input
          className="login-form-email"
          type="text"
          name="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-form-email"
          type="email"
          placeholder="Enter Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-form-password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="login-form-password"
          type="password"
          placeholder="Confirm password"
          value={passwordconfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button type="submit" className="form-button">
          Continue
        </button>
        <Link to="/login" className="login-form-redirect">
          Have an account login here
        </Link>
      </form>
    </main>
  );
}
