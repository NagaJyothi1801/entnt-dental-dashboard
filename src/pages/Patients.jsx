import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "../components/DashboardLayout";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({ name: "", dob: "", contact: "", healthInfo: "" });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(stored);
  }, []);

  const saveToStorage = (updated) => {
    localStorage.setItem("patients", JSON.stringify(updated));
    setPatients(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.dob || !formData.contact) {
      toast.error("Please fill all required fields");
      return;
    }

    if (editId) {
      const updated = patients.map((p) =>
        p.id === editId ? { ...formData, id: editId } : p
      );
      saveToStorage(updated);
      toast.success("Patient updated");
    } else {
      const newPatient = { ...formData, id: `p${Date.now()}` };
      saveToStorage([...patients, newPatient]);
      toast.success("Patient added");
    }

    setFormData({ name: "", dob: "", contact: "", healthInfo: "" });
    setEditId(null);
  };

  const handleEdit = (id) => {
    const patient = patients.find((p) => p.id === id);
    setFormData(patient);
    setEditId(id);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    const updated = patients.filter((p) => p.id !== id);
    saveToStorage(updated);
    toast.error("Patient deleted");
  };

  const handleExportCSV = () => {
    const headers = ["Name","DOB","Contact","Health Info"];
    const rows = patients.map((p) => [p.name, p.dob, p.contact, p.healthInfo]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "patients.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">🦷 Patient Management</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Contact"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
            <textarea
              placeholder="Health Info"
              value={formData.healthInfo}
              onChange={(e) => setFormData({ ...formData, healthInfo: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 w-full"
            >
              {editId ? "Update Patient" : "Add Patient"}
            </button>
          </form>

          {/* Patient List Section */}
          <div className="bg-white p-4 rounded shadow space-y-4">
            <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
              <input
                type="text"
                placeholder="Search by name or contact"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                className="border p-2 rounded w-full md:w-2/3"
              />
              <button
                onClick={handleExportCSV}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                📤 Export to CSV
              </button>
            </div>

            <ul className="space-y-3">
              {patients
                .filter(
                  (p) =>
                    p.name.toLowerCase().includes(searchTerm) ||
                    p.contact.toLowerCase().includes(searchTerm)
                )
                .map((p) => (
                  <li
                    key={p.id}
                    className="bg-gray-50 border p-3 rounded flex justify-between items-start"
                  >
                    <div>
                      <p><strong>Name:</strong> {p.name}</p>
                      <p><strong>DOB:</strong> {p.dob}</p>
                      <p><strong>Contact:</strong> {p.contact}</p>
                      <p><strong>Health:</strong> {p.healthInfo}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleEdit(p.id)}
                        className="bg-yellow-400 px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Patients;
