

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import RoleSelector from './pages/RoleSelector';
import CaseSelection from './pages/CaseSelection';
import HearingRoom from './pages/HearingRoom';
import Dashboard from "./components/Dashboard";


const RoleSelectorWithNavigation: React.FC = () => {
  const navigate = useNavigate();

  const handleSelect = (role: string) => {
    // نقش انتخاب‌شده را ذخیره کن (در آینده اگر خواستی به context یا state منتقل کن)
    console.log("نقش انتخاب‌شده:", role);
    navigate('/case-selection');
  };

  return <RoleSelector />
;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelectorWithNavigation />} />
        <Route path="/case-selection" element={<CaseSelection />} />
        <Route path="/hearing-room" element={<HearingRoom />} />
        <Route path="/dashboard" element={<Dashboard totalPoints={0} userPoints={0} />} />
      </Routes>
    </Router>
  );
};

export default App;

