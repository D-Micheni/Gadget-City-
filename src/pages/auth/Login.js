import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Login({ onLogin, user }) {
  let [username, setUserName] = useState("");
  let [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let [errors, setErrors] = useState([]);
  let navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("https://gadgets-production.up.railway.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user);
          navigate("/products");
          console.log("success", user);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <main id="login" onSubmit={handleSubmit}>
      <form id="login-form">
        <span className="login-form-name">Log In</span>
        <input
          className="login-form-email"
          input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          className="login-form-password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="error-cont">
          {errors.map((error) => {
            return <p className="errors">{error}</p>;
          })}
        </span>
        <button type="submit" className="form-button">
          Continue
        </button>
        <Link to="/getstarted" className="login-form-redirect">
          Create account here.
        </Link>
      </form>
    </main>
  );
}
