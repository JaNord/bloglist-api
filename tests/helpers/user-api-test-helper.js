const User = require("../../models/user")

const mockUsers = [
    {
        username: "correctName",
        name: "whatever",
        password: "correctPassword"
    },
    {
        username: "CorrectName2",
        name: "whatever",
        password: "da"
    },
    {
        username: "as",
        name: "whatever",
        password: "correctPassword"
    }
]

const usersInDb = async () => {
    const users = await User.find({})

    return users.map(user => user.toJSON())
}

module.exports = {
    mockUsers,
    usersInDb
}