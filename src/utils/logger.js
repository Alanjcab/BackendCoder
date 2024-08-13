import log4js from "log4js";
import dotenv from "dotenv";

dotenv.config();

const ENV = process.env.NODE_MODE || "prod";

log4js.configure({
  appenders: {
    fileAppender: { type: "file", filename: "src/utils/logs/errors.log" },
    consoleAppender: { type: "console" },
  },
  categories: {
    default: { appenders: ["fileAppender", "consoleAppender"], level: "debug" },
    dev: { appenders: ["consoleAppender"], level: "debug" },
    prod: { appenders: ["consoleAppender", "fileAppender"], level: "info" },
  },
});

export const logger = log4js.getLogger(ENV);
