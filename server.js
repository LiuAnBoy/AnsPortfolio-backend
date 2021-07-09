const express = require("express");
const connectDB = require("./config");

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

// Connect MongoDB
connectDB();

// TEST
app.get("/", (req, res) => res.send("Running~~"));

// Define Routes
app.use("/api/experience", require("./routes/api/experience"));
app.use("/api/project", require("./routes/api/project"));
app.use("/api/tag", require("./routes/api/tag"));
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
