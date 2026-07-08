# ⚡ Real-Time Webhook Delivery Engine & Dashboard

A lightweight, enterprise-grade full-stack Webhook Monitoring Engine built to track, log, and analyze real-time API delivery payloads. Features a robust automated retry mechanism, SQLite data persistence, and a live tracking UI analytics dashboard.

## 🚀 Live Preview
![Dashboard Screenshot](screenshot.png)

## ✨ Core Features
* **Live Analytics Cards:** Real-time calculation of Total Webhooks, Success Rate (%), and Failed Deliveries.
* **Automated Background Sync:** Client-side UI polls the Node.js Express backend every 3 seconds for continuous updates without page reloads.
* **CORS & Preflight Unlocked:** Configured custom Express middleware to securely allow cross-origin resource sharing (`http://127.0.0.1:5500`).
* **Data Persistence:** Managed relational schemas via SQLite3 database to store payload metadata, response bodies, and raw timestamps.

## 🛠️ Tech Stack
* **Frontend:** HTML5, Tailwind CSS (Dark Mode UI), JavaScript (Async/Await Fetch API)
* **Backend:** Node.js, Express.js
* **Database:** SQLite3

## 💻 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
   cd my-webhook-engine