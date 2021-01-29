const express = require("express");
const morgan = require("morgan")
const bodyParser = require("body-parser");
const logger = require("./handlers/logger");
const app = express();

app.use(morgan("dev"))
app.use(bodyParser.json())

const ruleRoutes = require("./routes/rule")

app.use(ruleRoutes)

app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message,
        status: "error"
    })

    logger.log("error", error.message)
})

app.listen(process.env.PORT || 8080, console.log("server running..."))