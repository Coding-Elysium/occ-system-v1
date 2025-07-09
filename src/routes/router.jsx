import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../page/Dashboard";
import CriminalCase from "../page/CriminalCase";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: (
      [
        {
          path: "/",
          element: <Dashboard/>
        },
        {
          path: "/landing",
          element: <div>Sample</div>
        },
        {
          path: "/criminalCase",
          element: <CriminalCase/>
        },
        {
          path: "*",
          element: <div>Under Construction</div>,
        },
      ]
    )
  },
]);

export default router;
