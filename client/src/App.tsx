import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import bg from "../public/background.png"
import bgdark from "../public/backgrounddark.png"

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (mode: boolean) => {
    setDarkMode(mode);
    if (mode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
  };

  useEffect(() => {
      const savedTheme = localStorage.getItem("darkMode");
      if (savedTheme === "true") {
        setDarkMode(true);
        document.body.classList.add("dark-mode");
      } else {
        setDarkMode(false);
        document.body.classList.remove("dark-mode");
      }
    }, []);

  return (
    <div className="background"
    style={{
      backgroundImage: `url(${darkMode ? bgdark : bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    }}> 
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>
      <main className="container pt-5">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
