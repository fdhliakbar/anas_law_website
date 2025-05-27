// // server.js
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// let users = []; // Simulasi database

// app.post("/api/register", (req, res) => {
//   const { email, password, mobileNumber } = req.body;
//   if (!email || !password || !mobileNumber) {
//     return res.status(400).json({ message: "All fields are required" });
//   }
//   // Simulasi cek email sudah terdaftar
//   if (users.find((u) => u.email === email)) {
//     return res.status(409).json({ message: "Email already registered" });
//   }
//   users.push({ email, password, mobileNumber });
//   res.status(201).json({ message: "User registered successfully" });
// });

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });
