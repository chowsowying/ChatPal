const app = require("./app");
const routes = require("./routes/index");
const logger = require("./configs/logger.config");
const setupSocket = require("./configs/socket.config");
const path = require("path");

// MongoDB
require("./configs/db.config");

// Routes
// Testing
app.get("/", (req, res) => {
  res.json({ message: "API" });
});

app.get("/api/v1", (req, res) => {
  res.json({ message: "API V1" });
});

app.use("/api/v1", routes);
// Handle Error Middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
});

// Server
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

//Handle Server Error
process.on("SIGTERM", () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Socket.IO
setupSocket(server);
