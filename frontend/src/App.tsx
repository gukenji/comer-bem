import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import DefaultRoute from "./utils/DefaultRoute";
import Bottom from "./components/Bottom";
import EatPage from "./pages/EatPage";
import MealsPage from "./pages/MealsPage";
import StatisticsPage from "./pages/StatisticsPage";
function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route element={<DefaultRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/eat" element={<EatPage />} />
            <Route path="/meals" element={<MealsPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
          </Route>
          <Route path="/" element={<LandingPage />} />
        </Routes>
        <Bottom />
      </Router>
      {/* <Add />
      <List /> */}
    </div>
  );
}

export default App;
