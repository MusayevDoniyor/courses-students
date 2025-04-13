require("dotenv").config();
const app = require("./middleware/app");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDoc = YAML.load("./docs/swagger.yml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get("/", (req, res) => {
  res.send("Server is working ✅");
});

app.use((req, res, next) => {
  res.status(404).json("Page not found!");
});

app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ message: "Server error", error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📄 Swagger is running on http://localhost:${PORT}/api-docs`);
});
