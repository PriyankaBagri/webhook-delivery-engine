const axios = require('axios');
const sqlite3 = require('sqlite3').verbose(); // Import the database tool

// 1. Put your webhook.site URL back here (or keep it fake to log a failure!)
const targetUrl = "https://webhook.site/3346b679-c5cb-4b9a-9670-dj273b2fcdd6BREAK"; 

const webhookPayload = {
    eventId: "evt_1003",
    eventType: "user.signup",
    data: { name: "Alex Kumar", email: "alex@example.com" }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- NEW DATABASE SETUP CODE ---
// This automatically creates a file named "webhook_database.db" in your folder
const db = new sqlite3.Database('./webhook_database.db');

// Create the table structure if it doesn't exist yet
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS webhook_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT,
            status TEXT,
            attempts INTEGER,
            timestamp TEXT
        )
    `);
});
// -------------------------------

async function sendWebhookWithRetries() {
    const MAX_RETRIES = 3;
    let finalStatus = "FAILED";
    let totalAttempts = 0;
    
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        totalAttempts = attempt;
        console.log(`🚀 [Attempt ${attempt}/${MAX_RETRIES}] Sending webhook...`);

        try {
            const response = await axios.post(targetUrl, webhookPayload, { timeout: 3000 });
            console.log(`✅ Success! Delivered on attempt ${attempt}. Status: ${response.status}`);
            finalStatus = "SUCCEEDED";
            break; // Stop looping on success

        } catch (error) {
            console.error(`❌ Attempt ${attempt} failed. Reason: ${error.message}`);
            
            if (attempt < MAX_RETRIES) {
                const waitTime = Math.pow(2, attempt) * 1000; 
                console.log(`⏱️ Waiting ${waitTime / 1000} seconds before trying again...`);
                await delay(waitTime);
            }
        }
    }

    // --- NEW: SAVE DATA TO DATABASE ---
    console.log("💾 Saving log entry to database...");
    const currentTime = new Date().toISOString();
    
    const query = `INSERT INTO webhook_logs (url, status, attempts, timestamp) VALUES (?, ?, ?, ?)`;
    
    db.run(query, [targetUrl, finalStatus, totalAttempts, currentTime], function(err) {
        if (err) {
            console.error("❌ Database Error:", err.message);
        } else {
            console.log(`📝 Log successfully saved with Row ID: ${this.lastID}`);
        }
        
        // Close the database connection when finished
        db.close();
    });
}

sendWebhookWithRetries();