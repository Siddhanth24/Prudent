const db = require('./db'); // Import the database connection

// Example query to test the connection
db.query('SELECT 1', (err, results) => {
  if (err) {
    console.error('Query failed:', err.message);
    return;
  }
  console.log('Query succeeded:', results);
});
