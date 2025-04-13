require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is working ✅");
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
