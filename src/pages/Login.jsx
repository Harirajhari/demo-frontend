import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // message sent from the Register page (if any)
  const info = location.state?.message;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // IMPORTANT: without this the cookie is not saved
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        navigate("/profile"); // the token cookie is now saved in the browser
      } else {
        setError(data.message); // for example: Wrong email or password
      }
    } catch (err) {
      setError("Cannot reach the server. Is the backend running?");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>

      {info && <p className="success">{info}</p>}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>

      <p className="link">
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
