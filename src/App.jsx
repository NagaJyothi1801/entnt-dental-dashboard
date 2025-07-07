import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PatientDashboard from "./pages/PatientDashboard";
import Patients from "./pages/Patients";
import Incidents from "./pages/Incidents";
import CalendarPage from "./pages/CalendarPage";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🔐 Redirect after login based on role
const RoleRedirect = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;
  if (user.role === "Admin") return <Navigate to="/admin/dashboard" replace />;
  if (user.role === "Patient") return <Navigate to="/patient/dashboard" replace />;
  return <Navigate to="/not-found" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Login />} />

          {/* 🔀 Redirect to role-specific dashboard */}
          <Route path="/dashboard" element={<ProtectedRoute><RoleRedirect /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute role="Admin"><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/patients" element={<ProtectedRoute role="Admin"><Patients /></ProtectedRoute>} />
          <Route path="/admin/incidents" element={<ProtectedRoute role="Admin"><Incidents /></ProtectedRoute>} />
          <Route path="/admin/calendar" element={<ProtectedRoute role="Admin"><CalendarPage /></ProtectedRoute>} />

          {/* Patient Routes */}
          <Route path="/patient/dashboard" element={<ProtectedRoute role="Patient"><PatientDashboard /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={2000} />
      </Router>
    </AuthProvider>
  );
};

export default App;
