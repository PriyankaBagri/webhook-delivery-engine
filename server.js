const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Import CORS tool

const app = express();
const PORT = 3000;

// UNLOCK THE SECURITY DOOR: This tells the server to accept requests from your Live Server!
app.use(cors({
    origin: 'http://127.0.0.1:5500' 
}));

app.use(express.json());

const db = new sqlite3.Database('./webhook_database.db');

// API Route for data
app.get('/api/logs', (req, res) => {
    const query = "SELECT * FROM webhook_logs ORDER BY id DESC";
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Security unlocked! Server running on http://localhost:${PORT}`);
});