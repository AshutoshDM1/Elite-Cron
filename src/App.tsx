import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/modules/Home/Home';
import PrivacyPolicy from '@/modules/PrivacyPolicy/PrivacyPolicy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
