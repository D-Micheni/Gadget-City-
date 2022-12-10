import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/landing";
import Navbar from "./pages/Navbar";
import Login from "./pages/auth/Login";
import Getstarted from "./pages/auth/GetStarted";
import Products from "./pages/products/products";
import { useEffect, useState } from "react";

function App() {
  let [user, setUser] = useState(null);
  let [log, setLog] = useState(false);

  useEffect(() => {
    fetch("https://gadgets-production.up.railway.app/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={<Login log={log} setLog={setLog} onLogin={setUser} />}
        />
        <Route
          path="/getstarted"
          element={<Getstarted log={log} setLog={setLog} onLogin={setUser} />}
        />
        <Route
          path="/products"
          element={<Products user={user} setUser={setUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
