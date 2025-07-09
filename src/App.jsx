import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import LeftNavigation from "./components/LeftNavigation/LeftNavigation";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <LeftNavigation />

        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
