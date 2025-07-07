import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import { useReactToPrint } from "react-to-print";
import "react-calendar/dist/Calendar.css";
import DashboardLayout from "../components/DashboardLayout";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    const storedIncidents = JSON.parse(localStorage.getItem("incidents")) || [];
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    setAppointments(storedIncidents);
    setPatients(storedPatients);
  }, []);

  const formatDate = (date) => new Date(date).toISOString().split("T")[0];

  const appointmentsOnDate = appointments.filter(
    (a) => formatDate(a.appointmentDate) === formatDate(selectedDate)
  );

  return (
    <DashboardLayout>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">📅 Appointment Calendar</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendar */}
          <div>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="rounded border shadow"
              tileClassName={({ date }) => {
                const hasAppt = appointments.some(
                  (a) => formatDate(a.appointmentDate) === formatDate(date)
                );
                return hasAppt ? "highlight" : null;
              }}
              tileContent={({ date }) => {
                const sameDayAppointments = appointments.filter(
                  (a) => formatDate(a.appointmentDate) === formatDate(date)
                );

                if (sameDayAppointments.length === 0) return null;

                return (
                  <div className="flex justify-center gap-1 mt-1">
                    {sameDayAppointments.map((a, i) => {
                      const statusColor =
                        a.status === "Completed"
                          ? "bg-green-500"
                          : a.status === "Pending"
                          ? "bg-red-500"
                          : "bg-gray-400";
                      return (
                        <span
                          key={i}
                          className={`w-2 h-2 rounded-full ${statusColor}`}
                          title={a.title}
                        />
                      );
                    })}
                  </div>
                );
              }}
            />

            {/* Legend for status dots */}
            <div className="flex gap-4 mt-4 ml-1">
              <div className="flex items-center gap-1 text-sm">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                Completed
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                Pending
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                Other
              </div>
            </div>
          </div>

          {/* Appointment List + Print */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-2 no-print">
              <h3 className="text-lg font-semibold">
                Appointments on {formatDate(selectedDate)}
              </h3>
              {appointmentsOnDate.length > 0 && (
                <button
                  onClick={handlePrint}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  🖨️ Print
                </button>
              )}
            </div>

            <div ref={printRef}>
              <div className="text-center mb-4 border-b pb-2">
                <h2 className="text-xl font-bold">ENTNT Dental Center</h2>
                <p className="text-sm text-gray-600">
                  Appointment Summary – {formatDate(selectedDate)}
                </p>
              </div>

              {appointmentsOnDate.length === 0 ? (
                <p className="text-gray-500">No appointments.</p>
              ) : (
                <ul className="space-y-3">
                  {appointmentsOnDate.map((appt) => {
                    const patient = patients.find((p) => p.id === appt.patientId);
                    return (
                      <li key={appt.id} className="border p-2 rounded bg-gray-50">
                        <p><strong>Patient:</strong> {patient?.name}</p>
                        <p><strong>Title:</strong> {appt.title}</p>
                        <p><strong>Time:</strong> {new Date(appt.appointmentDate).toLocaleTimeString()}</p>
                        <p><strong>Status:</strong> {appt.status}</p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
