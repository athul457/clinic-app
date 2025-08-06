import React, { useState, useEffect } from "react";
import LoginPage from "./LoginPage";
import CalendarPage from "./CalendarPage";
import DarkModeToggle from "./DarkModeToggle";

const USER_EMAIL = "staff@clinic.com";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!(menuOpen && isMobile)) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, isMobile]);

  function handleLogoClick() {
    window.location.reload();
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setShowLogin(false);
    setMenuOpen(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <span className="text-lg text-gray-700 dark:text-gray-200 font-semibold">Loading MyClinic...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow relative">
        <button onClick={handleLogoClick} className="flex items-center gap-2 focus:outline-none" title="Go to home">
          <span className="text-2xl">🏥</span>
          <span className="text-xl font-bold text-blue-700 dark:text-blue-300">MyClinic</span>
        </button>
        <div className="flex items-center gap-4">
          {!isLoggedIn && (
            <>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition relative group"
                onClick={() => setShowLogin(true)}
                title="Staff Login"
              >
                Login
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 pointer-events-none transition">Staff Login</span>
              </button>
              {!isMobile && <DarkModeToggle />}
            </>
          )}
          {isLoggedIn && (
            <div className="relative flex items-center gap-2">
              <button
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                onClick={() => setMenuOpen(m => !m)}
                aria-label="Menu"
              >
                {menuOpen ? (
                  <svg className="w-7 h-7 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
              {!isMobile && <DarkModeToggle />}
              {menuOpen && isMobile && (
                <>
                  <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm pointer-events-auto"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-20 w-56 bg-white dark:bg-gray-800 rounded shadow-lg border dark:border-gray-700 p-4 z-50 flex flex-col items-center">
                    <div className="flex gap-4 mb-4">
                      <button
                        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                      >
                        <svg className="w-7 h-7 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      {/* No dark mode toggle in mobile menu */}
                    </div>
                    <div className="mb-2 text-gray-700 dark:text-gray-200 font-semibold">Login Details</div>
                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-300 break-all">{USER_EMAIL}</div>
                    <button
                      className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                      onClick={handleLogout}
                    >
                      Log out
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </header>
      <main className={showLogin && !isLoggedIn ? "filter blur-sm pointer-events-none select-none flex-1" : "flex-1"}>
        {!isLoggedIn && (
          <div className="max-w-2xl mx-auto mt-16 mb-8 text-center">
            <div className="flex flex-col items-center mb-6">
              <span className="text-6xl mb-2">👩‍⚕️👨‍⚕️</span>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Welcome to your clinic’s appointment management system</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                Easily manage doctor appointments, view patient schedules, and stay organized.
              </p>
              {!showLogin && (
                <button
                  className="bg-blue-600 text-white px-8 py-3 rounded text-lg hover:bg-blue-700 transition shadow mt-2"
                  onClick={() => setShowLogin(true)}
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        )}
        {isLoggedIn && <CalendarPage />}
      </main>
      {/* Login modal overlay, always centered and floating */}
      {!isLoggedIn && showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <LoginPage onLogin={() => { setIsLoggedIn(true); setShowLogin(false); }} />
        </div>
      )}
      <footer className="text-center py-4 text-gray-500 text-sm bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        © {new Date().getFullYear()} MyClinic. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
