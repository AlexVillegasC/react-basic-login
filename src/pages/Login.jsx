import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://localhost:7014/login", {
        email: email,
        password: password,
      });

      const { access_token } = response.data;

      // Store the token and update the authentication state
      setToken(access_token);

      // Navigate to the home page or wherever you want to redirect after login
      navigate("/", { replace: true });

    } catch (err) {
      setError("Login failed, please check your credentials.");
    }
  };

  return (
    <div className="container">
      <h1>Login Page</h1>
      <p>Please login to access your account.</p>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login;
