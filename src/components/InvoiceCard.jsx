import { forwardRef } from "react";
import logo from "../assets/logo.png"; // Ensure the path is correct

const InvoiceCard = forwardRef(({ data, patient }, ref) => {
  if (!data || !patient) return null;

  return (
    <div
      ref={ref}
      className="p-6 max-w-md mx-auto bg-white text-black border border-gray-300 rounded-lg shadow-md font-sans"
    >
      {/* Header */}
      <div className="text-center mb-4">
        <img src={logo} alt="Clinic Logo" className="h-16 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-blue-700">ENTNT Dental Center</h2>
        <p className="text-sm text-gray-600 font-medium">🧾 Dental Treatment Invoice</p>
      </div>

      {/* Patient Info */}
      <div className="mb-4 space-y-1 text-sm">
        <p><strong>👤 Patient Name:</strong> {patient?.name || patient?.email}</p>
        <p><strong>📅 Appointment Date:</strong> {new Date(data.appointmentDate).toLocaleString()}</p>
      </div>

      <hr className="my-3" />

      {/* Appointment Details */}
      <div className="space-y-1 text-sm mb-4">
        <p><strong>🦷 Treatment:</strong> {data.treatment}</p>
        <p><strong>📌 Status:</strong> {data.status}</p>
        {data.comments && (
          <p><strong>🗒️ Comments:</strong> {data.comments}</p>
        )}
        <p><strong>💰 Cost:</strong> ₹ {Number(data.cost || 0).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
        })}</p>
      </div>

      {/* Attached Files */}
      {data.files?.length > 0 && (
        <div>
          <hr className="my-3" />
          <p className="font-semibold mb-1 text-sm">📎 Attached Files:</p>
          <ul className="list-disc ml-6 text-sm text-blue-700">
            {data.files.map((f, i) => (
              <li key={i}>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {f.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <hr className="my-4" />

      {/* Signature */}
      <div className="mt-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-700">Doctor Signature</p>
          <div className="border-t border-gray-400 w-40 mt-2" />
        </div>
        <p className="text-xs text-gray-500">Date: {new Date().toLocaleDateString()}</p>
      </div>

      {/* Footer */}
      <p className="mt-6 text-xs text-center text-gray-400 italic">
        Thank you for visiting ENTNT Dental Center
      </p>
    </div>
  );
});

export default InvoiceCard;
