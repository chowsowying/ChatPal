const mongoose = require("mongoose");
const logger = require("./logger.config");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.on("connected", () => {
  logger.info("MongoDB connection success");
});

connection.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});

if (process.env.NODE_ENV === "development") {
  mongoose.set("debug", true);
}
