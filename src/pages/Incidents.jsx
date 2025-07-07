import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

const Incidents = () => {
  const [patients, setPatients] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [formData, setFormData] = useState({
    patientId: "",
    title: "",
    description: "",
    comments: "",
    appointmentDate: "",
    cost: "",
    treatment: "",
    status: "Pending",
    nextDate: "",
    files: [],
  });

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
    const storedIncidents = JSON.parse(localStorage.getItem("incidents")) || [];
    setPatients(storedPatients);
    setIncidents(storedIncidents);
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const readerPromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({ name: file.name, url: reader.result });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readerPromises).then((fileData) => {
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...fileData],
      }));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIncident = {
      id: `i${Date.now()}`,
      ...formData,
    };
    const updated = [...incidents, newIncident];
    localStorage.setItem("incidents", JSON.stringify(updated));
    setIncidents(updated);

    // Reset form
    setFormData({
      patientId: "",
      title: "",
      description: "",
      comments: "",
      appointmentDate: "",
      cost: "",
      treatment: "",
      status: "Pending",
      nextDate: "",
      files: [],
    });
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString();
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">📅 Appointment / Incident Management</h2>

        {/* Appointment Form */}
        <form onSubmit={handleSubmit} className="grid gap-4 mb-8 bg-white p-4 rounded shadow-md max-w-3xl">
          <h3 className="text-lg font-semibold mb-2">📝 Add Appointment</h3>

          <select
            value={formData.patientId}
            onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="border p-2 rounded"
            required
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="border p-2 rounded"
          />

          <textarea
            placeholder="Comments"
            value={formData.comments}
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            className="border p-2 rounded"
          />

          <input
            type="datetime-local"
            value={formData.appointmentDate}
            onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            placeholder="Cost"
            value={formData.cost}
            onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Treatment"
            value={formData.treatment}
            onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
            className="border p-2 rounded"
          />

          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Follow-up">Follow-up</option>
          </select>

          <input
            type="date"
            value={formData.nextDate}
            onChange={(e) => setFormData({ ...formData, nextDate: e.target.value })}
            className="border p-2 rounded"
          />

          <input
            type="file"
            multiple
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            className="border p-2 rounded"
          />

          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Save Appointment
          </button>
        </form>

        {/* Appointments List */}
        <h3 className="text-lg font-semibold mb-2">🗂 All Appointments</h3>
        {incidents.length === 0 ? (
          <p className="text-gray-500">No incidents available.</p>
        ) : (
          <ul className="space-y-4">
            {incidents.map((incident) => {
              const patient = patients.find(p => p.id === incident.patientId);
              return (
                <li key={incident.id} className="bg-gray-100 p-4 rounded">
                  <p><strong>Patient:</strong> {patient?.name || "Unknown"}</p>
                  <p><strong>Title:</strong> {incident.title}</p>
                  <p><strong>Date:</strong> {formatDateTime(incident.appointmentDate)}</p>
                  <p><strong>Status:</strong> {incident.status}</p>
                  <p><strong>Treatment:</strong> {incident.treatment}</p>
                  <p><strong>Cost:</strong> ₹ {incident.cost}</p>
                  <p><strong>Next Appointment:</strong> {incident.nextDate || "-"}</p>
                  {incident.files?.length > 0 && (
                    <>
                      <p><strong>Files:</strong></p>
                      <ul className="ml-4 list-disc text-blue-600">
                        {incident.files.map((file, index) => (
                          <li key={index}>
                            <a href={file.url} target="_blank" rel="noreferrer">
                              {file.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Incidents;
