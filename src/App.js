import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navBar/navBar";
import Home from "./components/home/home";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
       </Routes> 
    </div>
  );
}

export default App;
