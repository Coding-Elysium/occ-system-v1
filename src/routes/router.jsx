import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../page/Dashboard";
import CriminalCase from "../page/CriminalCase";
import NotarialReport from "../page/NotarialReport";
import CivilCase from "../page/CivilCase";
import CivilCaseView from "../page/CivilCaseView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/civilcase",
        element: <CivilCase />,
      },
      {
        path: "/criminalCase",
        element: <CriminalCase />,
      },
      {
        path: "/civilcase/:id",
        element: <CivilCaseView />,
      },
      {
        path: "/notarialReports",
        element: <NotarialReport />,
      },
      {
        path: "*",
        element: <div>Under Construction</div>,
      },
    ],
  },
]);

export default router;
