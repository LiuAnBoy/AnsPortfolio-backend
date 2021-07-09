const express = require("express");
const path = require("path");
const connectDB = require("./config");

const app = express();

// Init Middleware
app.use(express.json({ extended: false }));

// Connect MongoDB
connectDB();

// Define Routes
app.use("/api/experience", require("./routes/api/experience"));
app.use("/api/project", require("./routes/api/project"));
app.use("/api/tag", require("./routes/api/tag"));
app.use("/api/profile", require("./routes/api/profile"));

// Server Static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/.next"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", ".next/server/pages/", "index.html")
    );
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
