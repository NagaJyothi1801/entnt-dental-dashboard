import DashboardLayout from "../components/DashboardLayout";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    const storedAppointments = JSON.parse(localStorage.getItem("incidents")) || [];
    setPatients(storedPatients);
    setAppointments(storedAppointments);
  }, []);

  const completedCount = appointments.filter(
    (a) => a.status?.toLowerCase() === "completed"
  ).length;

  const totalRevenue = appointments.reduce(
    (sum, a) => sum + Number(a.cost || 0),
    0
  );

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">
        <h2 className="text-2xl font-bold">📊 Welcome Admin – Dashboard KPIs</h2>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded shadow text-center">
            <p className="text-blue-600 font-medium">🧍‍♀️ Total Patients</p>
            <h3 className="text-3xl font-bold">{patients.length || 0}</h3>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 p-4 rounded shadow text-center">
            <p className="text-indigo-600 font-medium">📅 Total Appointments</p>
            <h3 className="text-3xl font-bold">{appointments.length || 0}</h3>
          </div>

          <div className="bg-green-50 border border-green-200 p-4 rounded shadow text-center">
            <p className="text-green-600 font-medium">✅ Completed Treatments</p>
            <h3 className="text-3xl font-bold">{completedCount || 0}</h3>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded shadow text-center">
            <p className="text-yellow-600 font-medium">💰 Total Revenue</p>
            <h3 className="text-3xl font-bold">
              ₹ {totalRevenue.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </h3>
          </div>
        </div>

        {/* Optional: Message if no appointments */}
        {appointments.length === 0 && (
          <p className="text-gray-500 text-sm italic text-center mt-6">
            No appointments found. Add some in the Appointments section.
          </p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
