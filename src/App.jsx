import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import LeftNavigation from "./components/LeftNavigation/LeftNavigation";
import { useMediaQuery } from "react-responsive";

function App() {
  // Tailwind breakpoints: md = 768px
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="h-screen flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {!isMobile && (
          <aside className="w-64 border-r border-gray-200">
            <LeftNavigation />
          </aside>
        )}

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
