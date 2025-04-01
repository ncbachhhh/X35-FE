import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layouts/Layout.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
    </div>
  );
}

export default App;
