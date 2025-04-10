import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import bg from "../public/background.png"

function App() {
  return (
    <div
    style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
    }}> 
      <Navbar />
      <main className="container pt-5">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
