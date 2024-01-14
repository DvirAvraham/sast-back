const express = require("express");
const { generateReport } = require("./api/controller");
const cors = require("cors");
const app = express();
const http = require("http").createServer(app);

const corsOptions = {
  // origin: process.env.NODE_ENV === "production" ? "https://generator.hacktics.ey.net" : ["http://localhost:5173"],
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '200mb' }));

const reportRoutes = require("./api/routes");

app.use("/api/generate", reportRoutes);

http.listen(3001, () => {
  console.log("Server is running on port: " + 3001);
});

generateReport()


