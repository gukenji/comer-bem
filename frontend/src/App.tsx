import React from "react";
import Add from "./components/Add";
import List from "./components/List";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
      {/* <Add />
      <List /> */}
    </div>
  );
}

export default App;
