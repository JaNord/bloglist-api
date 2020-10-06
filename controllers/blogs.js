const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

// get all blogs
blogsRouter.get("/", async (request, response) => {  
    const blogs = await Blog.find({})
    
    response.json(blogs)
})

// create new blog
blogsRouter.post("/", async (request, response) => {
    const body = request.body

    if (!body.title || !body.url) {
        const errorResponse = {
            error: "Properies title or url cannot be undefined"
        }

        return response.status(400).json(errorResponse)
    }

    if (!body.likes) {
        body.likes = 0
    }
    const blog = new Blog(body)

    const result = await blog.save()
    response.status(201).json(result)
})

// update blog by :id
blogsRouter.put("/:id", async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})

    response.json(updatedBlog)
})

// delete blog by :id
blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).send()
})

module.exports = blogsRouter