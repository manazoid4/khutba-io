import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PricingPage from './pages/PricingPage';
import DisplayPage from './pages/DisplayPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/display/:sessionId" element={<DisplayPage />} />
        <Route path="/admin/:sessionId" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
