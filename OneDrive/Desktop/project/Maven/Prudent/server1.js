const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const XLSX = require("xlsx");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle form submissions
app.post("/submit", (req, res) => {
    const { name, email, message, option } = req.body;

    // Validate required fields
    if (!email || !option) {
        return res.status(400).json({ error: "Email and Option are required." });
    }

    const filePath = "./contact_data.xlsx";

    // Prepare the new row data
    const newRow = {
        Name: name || "None", // Default to "None" if not provided
        Email: email,
        Message: message || "None", // Default to "None" if not provided
        Option: option,
    };

    // Check if the file already exists
    let workbook;
    if (fs.existsSync(filePath)) {
        // Read existing workbook
        workbook = XLSX.readFile(filePath);
    } else {
        // Create a new workbook if it doesn't exist
        workbook = XLSX.utils.book_new();
        // Add an empty sheet with a header
        XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([]), "Contacts");
    }

    // Get the sheet
    const sheet = workbook.Sheets["Contacts"];

    // Convert the sheet to JSON, add the new row, and write it back
    const sheetData = XLSX.utils.sheet_to_json(sheet);
    sheetData.push(newRow);
    const updatedSheet = XLSX.utils.json_to_sheet(sheetData);
    workbook.Sheets["Contacts"] = updatedSheet;

    // Write the updated workbook to the file
    XLSX.writeFile(workbook, filePath);

    res.status(200).json({ message: "Data saved successfully to Excel!" });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
