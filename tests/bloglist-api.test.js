const mongoose = require("mongoose")
const supertest = require("supertest")
const faker = require("faker")

const app = require("../app")
const Blog = require("../models/blog")

const api = supertest(app)

const initialBlogs = [
    {
        title: faker.name.firstName(),
        author: faker.random.word(),
        url: faker.internet.url(),
        likes: faker.random.number()
    },
    {
        title: faker.name.firstName(),
        author: faker.random.word(),
        url: faker.internet.url(),
        likes: faker.random.number()
    },
    {
        title: faker.name.firstName(),
        author: faker.random.word(),
        url: faker.internet.url(),
        likes: faker.random.number()
    }
]
// test setup
beforeEach(async () => {
    await Blog.deleteMany({})
    
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})
afterAll(() => {
    mongoose.connection.close()
})

//actual tests
describe("HTTP GET", () => {
    test("should return the correct amount of blogs", async() => {
        const response = await api.get("/api/blogs")
        
        expect(response.body).toHaveLength(2)
    })

    test("items returned should have identifier propery name id", async() => {
        const response = await api.get("/api/blogs")
        
        response.body.forEach(blog => {
            expect(blog.id).toBeDefined()  
        })
    })
})

describe("HTTP POST", () => {
    test("should save a valid blog to the db", async () => {
        const result = await api
            .post("/api/blogs")
            .send(initialBlogs[2])
        expect(result.body.title).toEqual(initialBlogs[2].title)

        const response = await api.get("/api/blogs")
        expect(response.body).toHaveLength(3)
    })
})