import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import AlertsPage from './pages/AlertsPage';
import PredictorPage from './pages/PredictorPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/predictor" element={<PredictorPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;