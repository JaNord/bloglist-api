const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const config = require("./utils/config")
const logger = require("./utils/logger")
const blogsRouter = require("./controllers/blogs")

const app = express()


logger.info(`Connecting to ${config.MONGODB_URI}`)
mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => {
    logger.info("Connected to MongoDB")
})
.catch((error) => {
    logger.error("Error connecting to MongoDB:", error)
})

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogsRouter)

module.exports = app
