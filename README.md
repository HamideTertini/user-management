#  FrontEnd Internship Challenge – User Management App

## 🔹 Project Overview

This is a **User Management Application** built entirely by me for the **Frontend Internship Challenge**. The app demonstrates advanced React skills including component architecture, state management with Redux Toolkit, data fetching via RTK Query, routing with React Router, and UI design using Ant Design & Tailwind CSS.

The application allows you to **view, search, sort, add, edit, and delete users**, with a professional and responsive interface.

---

## Features

### Core Features

* **List Users**: Fetch users from [JSONPlaceholder API](https://jsonplaceholder.typicode.com/users) and display in cards with **name, email, phone, website, company, and address**.
* **Search**: Filter users by **name** or **email** on the client-side.
* **Sorting**: Sort users by **name, email, or company** in ascending or descending order.
* **Add User (Local Only)**: Add new users with a form and validation. New users are added locally at the top of the list.
* **Edit User**: Update existing users locally.
* **Delete User**: Remove users locally with confirmation modal.
* **User Details Page**: Clicking a user shows full details including address, company, contact info, and website.

### Advanced Features

* **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
* **Redux Toolkit & RTK Query**: For state management and API integration.
* **Modal Forms**: Add or edit users using a reusable modal form component.
* **Client-side Sorting and Searching**: Efficient handling of large user lists.

---

## 🛠 Tech Stack

| Layer            | Technology                |
| ---------------- | ------------------------- |
| Frontend         | React + TypeScript        |
| State Management | Redux Toolkit + RTK Query |
| Routing          | React Router v6           |
| UI Library       | Ant Design                |
| Styling          | Tailwind CSS              |
| Build Tool       | Vite                      |

---

## Project Structure

```
src/
├─ api/             # RTK Query API slices
├─ components/      # Reusable components (UserCard, UserForm)
├─ pages/           # Main pages (Users, UserDetails)
├─ store/           # Redux slices and store setup
├─ App.tsx          # App routes
└─ main.tsx         # Entry point
```

---

##  Getting Started

### Prerequisites

* Node.js >= 18
* npm (or yarn)

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project folder
cd user-management-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open the app at `http://localhost:5173`.

---

##  Usage

1. **View Users**: Default page lists all API users and local additions.
2. **Search Users**: Type a name or email in the search bar.
3. **Sort Users**: Use the dropdown to sort by name, email, or company.
4. **Add User**: Click the “Add User” button and fill out the form.
5. **Edit/Delete Users**: Use edit or delete buttons on user cards.
6. **User Details**: Click a user card to view full profile information.

---

## Deployment

Build production files:

```bash
npm run build
```

Deploy the `dist/` folder to platforms like **Vercel, Netlify, or GitHub Pages**.

---

## Authorship

**Author:** Hamide Tertini – Complete implementation of:

* React component architecture
* Redux Toolkit state management
* RTK Query API integration
* Forms, validation, search & sorting
* Responsive UI design with Ant Design & Tailwind CSS



---

## Highlights

 Fully **responsive UI
 Clean, modern design
TypeScript type safety
Redux Toolkit & RTK Query integration
Client-side search, sort, and local CRUD

---


