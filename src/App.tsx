import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import Layout from "./components/Layout";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Layout>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="history" element={<History />} />
      </Routes>
    </Layout>
  );
}

export default App;
