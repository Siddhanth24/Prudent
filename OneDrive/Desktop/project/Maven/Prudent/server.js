const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

// SQL Server configuration
const dbConfig = {
    user: 'sa',  // Replace with your SQL Server username
    password: 'Pokemon123',  // Replace with your SQL Server password
    server: 'DESKTOP-ARU7PU7\SQL2014',  // Replace with your SQL Server address (localhost if local)
    database: 'MessageDB',
    options: {
        encrypt: true, // Use encryption for Azure SQL, optional for on-premises SQL Server
        trustServerCertificate: true // For self-signed certificates
    }
};

// Initialize Express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to SQL Server
sql.connect(dbConfig).then(() => {
    console.log('Connected to SQL Server');
}).catch(err => {
    console.error('Error connecting to SQL Server:', err);
});

// Handle POST request for form submission
app.post('/submit-form', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const request = new sql.Request();
        await request
            .input('Email', sql.NVarChar, email)
            .input('Name', sql.NVarChar, name)
            .input('Message', sql.NVarChar, message)
            .query('INSERT INTO Messages (Email, Name, Message) VALUES (@Email, @Name, @Message)');

        res.status(200).send('Message submitted successfully');
    } catch (err) {
        console.error('Error inserting message:', err);
        res.status(500).send('Error submitting message');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
