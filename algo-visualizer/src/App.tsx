// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UniversalPage } from './pages/UniversalPage';
import { LandingPage } from './pages/LandingPage.tsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/visualize/:topicId" element={<UniversalPage />} />
        <Route path="/visualize" element={<UniversalPage />} />
      </Routes>
    </Router>
  );
}

export default App;
