# Beni Moments 📸 | Photography Management System

**A comprehensive enterprise solution for professional photography studios to automate bookings, staff management, and client delivery.**

## 🚀 The Challenge
Professional photographers often rely on fragmented social media and manual methods for business. This leads to:
- **Scheduling Conflicts:** No clear calendar for staff and client appointments.
- **Payment Inefficiency:** Manual handling of cash and bank transfers without automated invoicing.
- **Client Friction:** Difficulty for clients to view packages or access their digital albums.

## 💡 The Solution
Beni Moments transforms manual photography business operations into a streamlined digital experience. It acts as a centralized hub for the studio owner, the crew, and the clients.

## 🛠️ Tech Stack
- **Frontend:** Next.js (React), Tailwind CSS
- **Backend:** Spring Boot (Java)
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## ✨ Key Features
- **Smart Booking System:** Real-time availability check for appointments.
- **Staff Management:** Assign photographers to specific events with automated notifications.
- **Client CRM:** Database to track order history, preferences, and contact details.
- **Media Gallery:** A dedicated space for clients to view and download their high-resolution photos.
- **Automated Invoicing:** Generates digital receipts and tracks payment status instantly.

## 🏗️ Architecture
The system uses a decoupled architecture with a **Spring Boot REST API** serving a high-performance **Next.js frontend**, ensuring scalability and a smooth user experience.

## 📸 Screenshots
| Landing Page | Staff Dashboard | Client Gallery |
| :--- | :--- | :--- |
| ![Landing](link_to_image) | ![Dashboard](link_to_image) | ![Gallery](link_to_image) |

## 🛠️ Installation & Setups
1. Clone the repo: `git clone https://github.com/sahan200272/Media-Gallery-Management-System.git`
2. Configure MongoDB connection in `application.properties`.
3. Run Spring Boot: `./mvnw spring-boot:run`
4. Run Frontend: `npm install && npm run dev`
