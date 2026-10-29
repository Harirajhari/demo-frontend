import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  // update the form state when the user types
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // send the form to the backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the page from reloading
    setError("");

    try {
      const res = await fetch(`http://localhost:5000/api/auth /register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // lets the browser handle cookies
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        // go to the login page and show a message there
        navigate("/login", { state: { message: "Registered! Please login." } });
      } else {
        setError(data.message); // for example: Email already registered
      }
    } catch (err) {
      setError("Cannot reach the server. Is the backend running?");
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button type="submit">Register</button>
      </form>

      <p className="link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
