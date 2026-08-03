const express = require("express");
const { Pool } = require("pg");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow your GitHub Pages website to access this API
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});


// ============================================================
// PostgreSQL connection
// ============================================================

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,

    ssl: {
        rejectUnauthorized: false
    }
});


// ============================================================
// HOME / TEST
// ============================================================

app.get("/", (req, res) => {

    res.json({
        message: "Tourist Guide Portal API is working!"
    });

});


// ============================================================
// CREATE BOOKINGS TABLE
// ============================================================

async function createTable() {

    try {

        await pool.query(`
            CREATE TABLE IF NOT EXISTS bookings (
                id SERIAL PRIMARY KEY,

                name VARCHAR(100) NOT NULL,

                email VARCHAR(150) NOT NULL,

                phone VARCHAR(30),

                place VARCHAR(150),

                travel_date DATE,

                people INTEGER DEFAULT 1,

                notes TEXT,

                booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log("Bookings table ready");

    } catch (error) {

        console.error(
            "Database table error:",
            error.message
        );

    }

}


// ============================================================
// SAVE BOOKING
// ============================================================

app.post("/bookings", async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            place,
            travelDate,
            people,
            notes
        } = req.body;


        // Validation

        if (!name || !email || !place) {

            return res.status(400).json({

                message:
                    "Name, email and place are required."

            });

        }


        // Convert people to number

        const numberOfPeople =
            parseInt(people) || 1;


        // Insert into PostgreSQL

        const result = await pool.query(

            `
            INSERT INTO bookings
            (
                name,
                email,
                phone,
                place,
                travel_date,
                people,
                notes
            )

            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7
            )

            RETURNING *
            `,

            [
                name,
                email,
                phone || null,
                place,
                travelDate || null,
                numberOfPeople,
                notes || null
            ]

        );


        // Success response

        res.status(201).json({

            message:
                "Booking saved successfully!",

            booking:
                result.rows[0]

        });


    } catch (error) {

        console.error(
            "Booking error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to save booking."

        });

    }

});


// ============================================================
// GET ALL BOOKINGS
// ============================================================

app.get("/bookings", async (req, res) => {

    try {

        const result = await pool.query(

            `
            SELECT *
            FROM bookings
            ORDER BY id DESC
            `

        );


        res.json(
            result.rows
        );


    } catch (error) {

        console.error(
            "Fetch error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to fetch bookings."

        });

    }

});


// ============================================================
// GET ONE BOOKING
// ============================================================

app.get("/bookings/:id", async (req, res) => {

    try {

        const id =
            parseInt(req.params.id);


        if (isNaN(id)) {

            return res.status(400).json({

                message:
                    "Invalid booking ID."

            });

        }


        const result = await pool.query(

            `
            SELECT *
            FROM bookings
            WHERE id = $1
            `,

            [id]

        );


        if (result.rows.length === 0) {

            return res.status(404).json({

                message:
                    "Booking not found."

            });

        }


        res.json(
            result.rows[0]
        );


    } catch (error) {

        console.error(
            "Get booking error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to get booking."

        });

    }

});


// ============================================================
// DELETE BOOKING
// ============================================================

app.delete("/bookings/:id", async (req, res) => {

    try {

        const id =
            parseInt(req.params.id);


        if (isNaN(id)) {

            return res.status(400).json({

                message:
                    "Invalid booking ID."

            });

        }


        const result = await pool.query(

            `
            DELETE FROM bookings
            WHERE id = $1
            RETURNING *
            `,

            [id]

        );


        if (result.rows.length === 0) {

            return res.status(404).json({

                message:
                    "Booking not found."

            });

        }


        res.json({

            message:
                "Booking deleted successfully.",

            booking:
                result.rows[0]

        });


    } catch (error) {

        console.error(
            "Delete error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to delete booking."

        });

    }

});


// ============================================================
// START SERVER
// ============================================================

const PORT =
    process.env.PORT || 10000;


app.listen(
    PORT,
    "0.0.0.0",
    async () => {

        console.log(
            `Server running on port ${PORT}`
        );

        await createTable();

    }
);