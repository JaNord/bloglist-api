const logger = require("./logger")

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: "unknown endpoint"})
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization")

    if(authorization && authorization.toLowerCase().startsWith("bearer ")) {
        request.token = authorization.substring(7)
    }

    else {
        request.token = null
    }

    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === "CastError") {
        return response.status(400).send({
            error: "malformated id"
        })
    }

    else if (error.name === "ValidationError") {
        return response.status(400).json({error: error.message})
    }
    else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({
            error: "invalid token" 
        })
    }

    next(error)
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}