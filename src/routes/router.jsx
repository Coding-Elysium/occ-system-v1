import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../page/Dashboard";
import CriminalCase from "../page/CriminalCase";
import NotarialReport from "../page/NotarialReport";

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
          path: "/notarialReports",
          element: <NotarialReport/>
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
