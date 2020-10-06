const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {  
    const blogs = await  Blog.find({})
    
    response.json(blogs)
})

blogsRouter.post("/", async (request, response) => {
    const data = request.body

    if (!data) {
        const errorResponse = {
            error: "Request body cannot be empty"
        }

        return response.status(400).json(errorResponse)
    }

    if (!data.likes) {
        data.likes = 0
    }
    const blog = new Blog(data)

    const result = await blog.save()
    response.status(201).json(result)
})

module.exports = blogsRouter