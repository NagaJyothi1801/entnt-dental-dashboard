import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import InvoiceCard from "../components/InvoiceCard";
import html2pdf from "html2pdf.js";

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const invoiceRef = useRef();

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("incidents")) || [];
    const userAppointments = storedAppointments.filter(
      (a) => a.patientId === user?.patientId
    );
    setAppointments(userAppointments);
  }, [user?.patientId]);

  const formatDateTime = (dateStr) =>
    new Date(dateStr).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  const handleDownloadPDF = () => {
    if (!invoiceRef.current) return;
    const element = invoiceRef.current;
    const opt = {
      margin: 0.5,
      filename: `Invoice_${user?.name || user?.email}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-4">👤 Welcome, {user?.email}</h2>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">🩺 Your Appointments</h3>

          {appointments.length === 0 ? (
            <p className="text-gray-500 italic">No appointments found.</p>
          ) : (
            <ul className="space-y-6">
              {appointments.map((appt) => (
                <li key={appt.id} className="border p-4 rounded bg-gray-50">
                  <p><strong>Title:</strong> {appt.title}</p>
                  <p><strong>Status:</strong> {appt.status}</p>
                  <p><strong>Treatment:</strong> {appt.treatment}</p>
                  <p><strong>Date:</strong> {formatDateTime(appt.appointmentDate)}</p>

                  {appt.files?.length > 0 && (
                    <>
                      <p className="mt-2"><strong>Attached Files:</strong></p>
                      <ul className="list-disc ml-6 text-blue-600">
                        {appt.files.map((file, i) => (
                          <li key={i}>
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:underline"
                            >
                              {file.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => {
                        setSelectedInvoice(appt);
                        setTimeout(() => handlePrint(), 100);
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      🖨️ Print Invoice
                    </button>
                    <button
                      onClick={() => {
                        setSelectedInvoice(appt);
                        setTimeout(() => handleDownloadPDF(), 100);
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      📥 Download PDF
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Offscreen printable/downloadable invoice */}
        {selectedInvoice && (
          <div style={{ position: "absolute", top: "-10000px", left: "-10000px" }}>
            <InvoiceCard ref={invoiceRef} data={selectedInvoice} patient={user} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
