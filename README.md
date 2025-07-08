# 🦷 ENTNT Dental Center – React Appointment Dashboard

A modern **React-based admin and patient dashboard** to manage dental appointments, patient records, calendar scheduling, and invoice printing. Built as part of the ENTNT Frontend Developer assignment.

---

## 🔗 Live Demo

🌐 [https://entnt-dental-dashboard-self.vercel.app](https://entnt-dental-dashboard-self.vercel.app)

---

## 🔧 Tech Stack

- **Frontend**: React, TailwindCSS, Vite
- **Routing**: React Router
- **State Management**: React Context (Auth)
- **Calendar**: `react-calendar`
- **Print Support**: `react-to-print`
- **Notifications**: `react-toastify`
- **Data Storage**: `localStorage` (no backend)

---

## 🚀 Features

### 👩‍⚕️ Admin Dashboard
- Dashboard with KPIs: Total Patients, Appointments, Revenue, Completed Treatments
- Patient Management (Add / Edit / Delete)
- Appointment Management (Add treatment details, upload files)
- Calendar View with appointments highlighted
- Export Patient List to CSV

### 🧑‍⚕️ Patient Dashboard
- Login with credentials
- View their own appointment history
- Download/Print invoices for treatments (with files)

---

## 🔑 Default Logins

| Role    | Email           | Password     |
|---------|------------------|--------------|
| Admin   | `admin@entnt.in` | `admin123`   |
| Patient | `john@entnt.in`  | `patient123`    |

---

## 🖥️ Getting Started (For Local Setup)

```bash
git clone https://github.com/NagaJyothi1801/entnt-dental-dashboard.git
cd entnt-dental-dashboard
npm install
npm run dev
