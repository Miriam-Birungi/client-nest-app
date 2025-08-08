import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import DashboardPage from "./pages/dashboard/DashboardPage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import SchedulePage from "./pages/dashboard/SchedulePage";
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
        <Route path="*" element={<Navigate to="/auth/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
