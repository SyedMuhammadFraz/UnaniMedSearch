const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(
  cors({
    origin: "https://unani-med-search-frontend.vercel.app", // Replace with your frontend's origin
    methods: "GET,POST,PUT,DELETE", // Allowed methods
  })
);

// Routes
app.use("/api/disease", require("./routes/disease"));
app.use("/api/order", require("./routes/order"));
app.use("/api", require("./routes/medicines"));
// app.use("/api/order", require("./routes/order"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
