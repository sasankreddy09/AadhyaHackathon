import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Triage from './pages/Triage';
import TriageForm from './pages/TriageForm';
import TriageSpeech from './pages/TriageSpeech';
import ProtectedRoute from './components/ProtectedRoute';
import Doctors from './pages/doctor';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile'; 

function AppContent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/triage" element={
          <ProtectedRoute>
            <Triage />
          </ProtectedRoute>
        } />
        <Route path="/triage/form" element={
          <ProtectedRoute>
            <TriageForm />
          </ProtectedRoute>
        } />
        <Route path="/triage/speech" element={
          <ProtectedRoute>
            <TriageSpeech />
          </ProtectedRoute>
        } />
        <Route path="/doctors" element={
          <ProtectedRoute>
            <Doctors />
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
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
