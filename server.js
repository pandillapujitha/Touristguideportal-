const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

// Allow your GitHub website to connect
app.use(cors());

// Read JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Home / test API
app.get("/", (req, res) => {
  res.json({
    message: "Tourist Guide Portal API is working!"
  });
});

// Create bookings table
async function createTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        phone VARCHAR(30),
        place VARCHAR(150),
        booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Bookings table ready");
  } catch (error) {
    console.error("Database table error:", error.message);
  }
}

// Save booking
app.post("/bookings", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      place
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required"
      });
    }

    const result = await pool.query(
      `
      INSERT INTO bookings
      (name, email, phone, place)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        name,
        email,
        phone || null,
        place || null
      ]
    );

    res.status(201).json({
      message: "Booking saved successfully!",
      booking: result.rows[0]
    });

  } catch (error) {
    console.error("Booking error:", error);

    res.status(500).json({
      message: "Failed to save booking"
    });
  }
});

// Get all bookings
app.get("/bookings", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM bookings ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (error) {
    console.error("Fetch error:", error);

    res.status(500).json({
      message: "Failed to fetch bookings"
    });
  }
});

// Start server
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Server running on port ${PORT}`);

  await createTable();
});