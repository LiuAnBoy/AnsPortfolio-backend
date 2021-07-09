const express = require("express");
const path = require("path");
const next = require("next");
const connectDB = require("./config");

// const app = express();

const PORT = process.env.PORT || 5000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const experience = require("./routes/api/experience");
const project = require("./routes/api/project");
const tag = require("./routes/api/tag");
const profile = require("./routes/api/profile");

// // Init Middleware
// app.use(express.json({ extended: false }));

// Connect MongoDB
connectDB();

// // Define Routes
// app.use("/api/experience", require("./routes/api/experience"));
// app.use("/api/project", require("./routes/api/project"));
// app.use("/api/tag", require("./routes/api/tag"));
// app.use("/api/profile", require("./routes/api/profile"));

// // // Server Static assets in production
// // if (process.env.NODE_ENV === "production") {
// //   // Set static folder
// //   app.use(express.static("client/.next/server/pages"));

// //   app.get("*", (req, res) => {
// //     res.sendFile(
// //       path.resolve(
// //         __dirname,
// //         "client",
// //         ".next",
// //         "server",
// //         "pages",
// //         "index.html"
// //       )
// //     );
// //   });
// // }

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.prepare().then(() => {
  const server = express();

  // // Init Middleware
  server.use(express.json({ extended: false }));

  server.get("*", (req, res) => handle(req, res));

  // // Define Routes
  server.use("/api/experience", experience);
  server.use("/api/project", project);
  server.use("/api/tag", tag);
  server.use("/api/profile", profile);

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server started on port ${PORT}`);
  });
});
