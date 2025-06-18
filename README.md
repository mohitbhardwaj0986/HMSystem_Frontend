# HMS Frontend (Hospital Management System)

This is the frontend for the HMS (Hospital Management System), built with **React.js**, **Redux Toolkit**, **Axios**, **React Router**, and **Tailwind CSS**.

---

## 🌐 Live Features Completed

- ✅ Responsive **Home Page**
- ✅ Animated **Login** & **Register** pages
- ✅ **Doctor Profile** listing & details (fetched using Redux Toolkit + Axios)
- ✅ Reusable **Toastify** notifications
- ✅ Clean UI with soft gradients and modern typography

---

## ⚙️ Tech Stack

- ⚛️ React.js
- 🎯 Redux Toolkit (RTK)
- 📡 Axios (with interceptors)
- 🎨 Tailwind CSS
- 🍞 React Toastify
- 🌍 React Router DOM

---

## 📁 Folder Structure


---

## 🚀 Pages Overview

### 🏠 Home Page
- Introductory section about the HMS
- Smooth UI with gradient backgrounds
- Button navigation to Login/Register or Doctor profiles

### 🔐 Login & Register
- Beautiful UI with clean layout
- Uses `Toastify` to show:
  - ✅ Login successful
  - ❌ Errors (invalid credentials, missing fields)
- Stores `accessToken` & `userInfo` in `localStorage`

### 👨‍⚕️ Doctor Profile
- Displays **all doctors** from backend
- Each doctor card:
  - Avatar fallback
  - Bio, specialization, education
  - Button to view profile (`/single-doctor/:id`)
- Detailed page for selected doctor
- Handled via `Redux Toolkit + Axios`

---



