const mongoose = require("mongoose")
const supertest = require("supertest")

const User = require("../models/user")
const helper = require("./helpers/user-api-test-helper")
const app = require("../app")

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const userObject = new User(helper.mockUsers[0])
    await userObject.save()
})

afterAll(() => {
    mongoose.connection.close()
})

describe("creating a new user", () => {

    test("should fail if username is too short", async () => {
        const result = await api
            .post("/api/users")
            .send(helper.mockUsers[2])
            .expect(400)

        const usersInDb = await helper.usersInDb()

        expect(result.body.error).toContain("User validation failed")
        expect(usersInDb).toHaveLength(1)
    })

    test("should fail if username is nor unique", async () => {
        const result = await api
            .post("/api/users")
            .send(helper.mockUsers[0])
            .expect(400)
        
        const usersInDb = await helper.usersInDb()

        expect(result.body.error).toContain("User validation failed")
        expect(usersInDb).toHaveLength(1)
    })
    
    test("should fail if password is too short", async () => {
        const result = await api
            .post("/api/users")
            .send(helper.mockUsers[1])
            .expect(400)
        
        const usersInDb = await helper.usersInDb()

        expect(result.body.error).toContain("Password must be at least 3 characters long")
        expect(usersInDb).toHaveLength(1)
    }) 
})