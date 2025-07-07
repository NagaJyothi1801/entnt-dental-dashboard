// src/utils/seed.js

export const seedDataIfEmpty = () => {
  const existingPatients = localStorage.getItem("patients");
  const existingIncidents = localStorage.getItem("incidents");

  if (!existingPatients) {
    localStorage.setItem("patients", JSON.stringify([
      {
        id: "p1",
        name: "John Doe",
        dob: "1995-03-15",
        contact: "9876543210",
        healthInfo: "No allergies"
      },
      {
        id: "p2",
        name: "Jyothi N",
        dob: "2001-01-20",
        contact: "9123456780",
        healthInfo: "Diabetic"
      }
    ]));
  }

  if (!existingIncidents) {
    localStorage.setItem("incidents", JSON.stringify([
      {
        id: "a1",
        title: "Tooth Cleaning",
        patientId: "p1",
        appointmentDate: "2025-07-06T10:00:00",
        status: "Completed",
        treatment: "Cleaning",
        cost: 500,
        comments: "Routine cleaning",
        files: []
      },
      {
        id: "a2",
        title: "Cavity Filling",
        patientId: "p2",
        appointmentDate: "2025-07-08T14:30:00",
        status: "Pending",
        treatment: "Filling",
        cost: 800,
        comments: "Return for review",
        files: []
      }
    ]));
  }
};
