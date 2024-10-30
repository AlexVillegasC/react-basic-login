import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import { Link } from "react-router-dom";

const Routes = () => {
  const { token } = useAuth();  // React to changes in the token

  // Public routes (for unauthenticated users)
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: (
        <div>
          <h1>Home Page</h1>
          <p>Please <Link to="/login">login</Link> to access your account.</p>
        </div>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];

  // Routes for authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, 
      children: [
        {
          path: "",
          element: (
            <div>
              <h1>Basic Route Protection Example</h1>
              <p>Welcome! this route is shown to authenticated users.</p>
              <Link to="/logout">Logout</Link>
            </div>
          ),
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...(token ? routesForAuthenticatedOnly : routesForNotAuthenticatedOnly)
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
