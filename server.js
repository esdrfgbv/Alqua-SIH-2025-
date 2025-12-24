const express = require('express');
const bodyParser = require('body-parser');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // serve HTML/CSS/JS from public

// Default route: serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle login POST
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const filePath = path.join(__dirname, 'login_data.xlsx');

    let workbook;
    let existingData = [];

    // Check if Excel file exists
    if (fs.existsSync(filePath)) {
        workbook = XLSX.readFile(filePath);
        const worksheet = workbook.Sheets['Login Data'] || workbook.Sheets[workbook.SheetNames[0]];
        if (worksheet) {
            existingData = XLSX.utils.sheet_to_json(worksheet);
        }
    } else {
        workbook = XLSX.utils.book_new();
    }

    // Create new login entry
    const newEntry = {
        'Serial No': existingData.length + 1,
        'Email': email,
        'Password': password,
        'Login Date': new Date().toLocaleString(),
        'Browser': req.headers['user-agent'],
        'Status': 'Active'
    };

    existingData.push(newEntry);

    // Convert JSON to worksheet
    const newWorksheet = XLSX.utils.json_to_sheet(existingData);

    // Update workbook
    workbook.Sheets['Login Data'] = newWorksheet;
    if (!workbook.SheetNames.includes('Login Data')) {
        workbook.SheetNames.push('Login Data');
    }

    // Save workbook
    try {
        XLSX.writeFile(workbook, filePath);
    } catch (err) {
        console.error('Could not write Excel file:', err);
        return res.json({ success: false, message: 'Excel file is open or locked. Close it and try again.' });
    }

    res.json({ success: true, totalRecords: existingData.length });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
