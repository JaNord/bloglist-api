const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

// get all users
usersRouter.get("/", async (request, response) => {
    const users = await User.find({})

    response.json(users)
})
// create new user
usersRouter.post("/", async (request, response) => {
    const body = request.body

    if (!body.password || body.password.length < 3) {
        return response.status(400).send({error: "Password must be at least 3 characters long"})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

module.exports = usersRouter
