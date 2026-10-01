// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Wings from './pages/Wings';
import Support from './pages/Support';
import SupportSuccess from './pages/SupportSuccess';
import SupportCancel from './pages/SupportCancel';
import HelpEnroll from './pages/HelpEnroll';
import HelpQA from './pages/HelpQA';
import './index.css';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wings" element={<Wings />} />
      <Route path="/support" element={<Support />} />
      <Route path="/support/success" element={<SupportSuccess />} />
      <Route path="/support/cancel" element={<SupportCancel />} />
      <Route path="/help/enroll" element={<HelpEnroll />} />
      <Route path="/help/qa" element={<HelpQA />} />
      <Route path="/Wings" element={<Navigate to="/wings" replace />} />
      <Route path="/portal" element={<Navigate to="/wings" replace />} />
      <Route path="/Portal" element={<Navigate to="/wings" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
