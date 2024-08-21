import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import SearchPage from "./pages/SearchPage";
import OrderPage from "./pages/OrderPage";
import MedicineSearch from "./components/MedicineSearch";

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/search" element={<SearchPage />} />
        <Route path={`/orders`} element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
