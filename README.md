# Doconnect Services — Client/Server Architecture

This repository contains the refactored **Doconnect Services** insurance platform, restructured into a clean **Client/Server** architecture.

## Repository Structure

* **`/client`**: The React + Vite frontend application (fully responsive, custom animations, custom routing).
* **`/server`**: The Node.js + Express backend server providing a secure email notification API with integrated input validation, sanitization, and rate limiting.

---

## Getting Started

### 1. Prerequisite Installations
Make sure you have Node.js (version 18 or above) installed on your system.

### 2. Install Dependencies
You can install dependencies for both projects simultaneously from the root directory:
```bash
npm run install-all
```

### 3. Setup Backend Environment Variables
Create a `.env` file in the `/server` directory:
```bash
cp server/.env.example server/.env
```
Open `server/.env` and update the placeholders with your actual SMTP details and target emails:
```env
PORT=5000
CLIENT_URL=http://localhost:5173

# SMTP Server Configurations (e.g., Mailtrap, SendGrid, Gmail, etc.)
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your_smtp_user
MAIL_PASSWORD=your_smtp_password

# Email Addresses
BUSINESS_EMAIL=info@doconnectservices.com
FROM_EMAIL=noreply@doconnectservices.com
```

*Note: If these SMTP credentials are left blank or set to defaults, the server will automatically run in **MOCK/Simulated Mailer Mode** and print the outbound emails directly to the server terminal console for easy testing and debugging.*

### 4. Setup Frontend Environment Variables (Optional)
If you want to configure a custom API URL in production, create a `.env` file inside the `/client` directory:
```env
VITE_BACKEND_URL=http://localhost:5000
```
*(By default, it will fall back to `http://localhost:5000` during development)*

### 5. Running the Application
You can run both client and server concurrently from the root directory using:
```bash
npm run dev
```

---

## API Documentation

### Contact Enquiry Endpoint

* **Endpoint**: `POST /api/contact`
* **Headers**: `Content-Type: application/json`
* **Request Body**:
  ```json
  {
    "name": "Customer Name",
    "email": "customer@example.com",
    "phone": "9876543210",
    "service": "Health Insurance",
    "message": "I would like to know more about the premium plans."
  }
  ```
* **Security & Validation Features**:
  * Auto-trim and sanitization of incoming text inputs.
  * Validation of required fields, email format, and message length.
  * Built-in Express rate-limiting to block spam (max 5 requests per 15 minutes per IP).
  * Graceful fallback to mock console mailer when SMTP credentials are absent.
  * Secure error handling to hide credentials or details from the client.
