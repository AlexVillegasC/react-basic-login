import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/", { replace: true });
  };

  return (
    <div className="container">
      <h1>Logout Page</h1>
      <p>Click below to log out.</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Logout;
