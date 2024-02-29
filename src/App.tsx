import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import History from "./pages/History";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="history" element={<History />} />
      </Routes>
    </>
  );
}

export default App;
