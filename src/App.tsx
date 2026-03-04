import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Triage from './pages/Triage';
import TriageForm from './pages/TriageForm';
import TriageSpeech from './pages/TriageSpeech';

function AppContent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/triage" element={<Triage />} />
        <Route path="/triage/form" element={<TriageForm />} />
        <Route path="/triage/speech" element={<TriageSpeech />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
