import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // when the page opens, ask the backend: who is logged in?
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/profile`, {
          credentials: "include", // sends the token cookie to the backend
        });

        if (res.status === 401) {
          navigate("/login"); // not logged in, so go to login
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError("Cannot reach the server. Is the backend running?");
      }
    };

    loadProfile();
  }, []);

  const handleLogout = async () => {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    navigate("/login"); // the cookie is removed by the backend
  };

  if (error) return <div className="card"><p className="error">{error}</p></div>;
  if (!user) return <div className="card"><p>Loading...</p></div>;

  return (
    <div className="card">
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <p className="success">You are logged in. This page is protected.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
