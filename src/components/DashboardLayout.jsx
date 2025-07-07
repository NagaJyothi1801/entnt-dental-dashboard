import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const role = user?.role;
  const basePath = role === "Admin" ? "/admin" : "/patient";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-4 flex flex-col">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center border-b border-blue-700 pb-4">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl mb-2">
            👤
          </div>
          <p className="font-semibold">{role}</p>
          <p className="text-sm text-blue-200 break-all text-center">{user?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 mt-6">
          <div className="bg-blue-700 hover:bg-blue-600 transition rounded shadow">
            <Link
              to={`${basePath}/dashboard`}
              className="flex items-center gap-2 px-4 py-3 text-white text-sm font-medium"
            >
              🏠 Dashboard
            </Link>
          </div>

          {role === "Admin" && (
            <>
              <div className="bg-blue-700 hover:bg-blue-600 transition rounded shadow">
                <Link
                  to="/admin/patients"
                  className="flex items-center gap-2 px-4 py-3 text-white text-sm font-medium"
                >
                  👥 Manage Patients
                </Link>
              </div>

              <div className="bg-blue-700 hover:bg-blue-600 transition rounded shadow">
                <Link
                  to="/admin/incidents"
                  className="flex items-center gap-2 px-4 py-3 text-white text-sm font-medium"
                >
                  📅 Manage Appointments
                </Link>
              </div>

              <div className="bg-blue-700 hover:bg-blue-600 transition rounded shadow">
                <Link
                  to="/admin/calendar"
                  className="flex items-center gap-2 px-4 py-3 text-white text-sm font-medium"
                >
                  📆 Appointment Calendar
                </Link>
              </div>
            </>
          )}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full"
        >
           Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome {role}</h1>
        {children}
        <ToastContainer position="top-right" autoClose={2000} />
      </main>
    </div>
  );
};

export default DashboardLayout;
