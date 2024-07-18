const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, colorize } = format;

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "debug",
  format: combine(
    label({ label: "playwright-tests" }),
    timestamp(),
    colorize(),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/test.log" }),
  ],
});

module.exports = logger;
