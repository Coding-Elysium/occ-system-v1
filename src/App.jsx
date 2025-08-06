import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { useMediaQuery } from "react-responsive";
import LeftNavigation from "./components/LeftNavigation/LeftNavigation";

function App() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden mt-15">
        {isMobile && (
          <main className="flex-1 bg-gray-50 overflow-y-auto p-4 sm:p-6">
            <Outlet />
          </main>
        )}

        {!isMobile && (
          <main className=" w-full bg-gray-50 mt-6 p-4 sm:p-6">
            <Outlet />
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
