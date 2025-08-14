import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import DashboardPage from "./pages/dashboard/DashboardPage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import SchedulePage from "./pages/dashboard/SchedulePage";
import MediaPage from "./pages/dashboard/MediaPage";
import TeamPage from "./pages/dashboard/TeamPage";
import PricingPage from "./pages/settings/PricingPage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/settings" element={<PricingPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="*" element={<Navigate to="/auth/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
