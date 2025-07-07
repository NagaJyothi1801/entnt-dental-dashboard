# 🦷 ENTNT Dental Center – React Appointment Dashboard


A modern React-based admin and patient dashboard to manage dental appointments, patient records, calendar scheduling, and invoice printing.

---

## 🔧 Tech Stack

- **Frontend**: React, TailwindCSS, Vite
- **State Management**: React Context API (Auth)
- **Calendar**: `react-calendar`
- **Invoice Printing**: `react-to-print`
- **Toast Notifications**: `react-toastify`
- **Data Storage**: localStorage (no backend)

---

## 🚀 Features

### 👩‍⚕️ Admin Dashboard
- View total patients, appointments, completed treatments, and revenue
- Add, edit, or delete patient records
- Create and manage appointments/incidents
- Upload files for appointments
- View appointments in calendar format

### 🧑‍⚕️ Patient Dashboard
- View their own appointment history
- Access uploaded files
- Print invoice with appointment/treatment details

---

## 🔑 Default Credentials

| Role    | Email           | Password    |
|---------|------------------|-------------|
| Admin   | `admin@entnt.in` | `admin123`  |
| Patient | `john@entnt.in`  | `john123`   |

---

## 🖥️ How to Run Locally

```bash
git clone https://github.com/NagaJyothi1801/entnt-dental-dashboard.git
cd entnt-dental-dashboard
npm install
npm run dev
