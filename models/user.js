const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (username) => {
                return username.length >= 3
            }
        }
    },
    name: String,
    passwordHash: String
})

userSchema.plugin(uniqueValidator)

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.passwordHash
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User