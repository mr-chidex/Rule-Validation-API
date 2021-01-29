const { createLogger, format, transports } = require("winston");

//To properly log errors ecountered by users for the developer or owner of application
const logger = createLogger({
    transports: [
        new transports.Console({ level: 'info', format: format.combine(format.timestamp(), format.json()) }),
        new transports.File({ level: 'info', filename: "info.log", format: format.combine(format.timestamp(), format.json()) }),
        new transports.File({ level: 'error', filename: "error.log", format: format.combine(format.timestamp(), format.json()) })
    ]
})
module.exports = logger;