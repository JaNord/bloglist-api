const blogsRouter = require("express").Router()
const jwt = require("jsonwebtoken")

const Blog = require("../models/blog")
const User = require("../models/user")

// get all blogs
blogsRouter.get("/", async (request, response) => {  
    const blogs = await Blog.find({}).populate("user")
    
    response.json(blogs)
})

// create new blog
blogsRouter.post("/", async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    if (!request.token || !decodedToken.id) {
        response.status(401).json({
            error: "token missing or invalid"
        })
    }

    const user = await User.findById(decodedToken.id)

    if (!body.title || !body.url) {
        const errorResponse = {
            error: "Properies title or url cannot be undefined"
        }

        return response.status(400).json(errorResponse)
    }

    if (!body.likes) {
        body.likes = 0
    }

    body.user = user
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

    const updatedBlog = await 
    Blog
        .findByIdAndUpdate(request.params.id, blog, {new: true})
        .populate("user")

    response.json(updatedBlog)
})

// add comment to blog by :id
blogsRouter.post("/:id/comment", async (request, response) => {
    const body = request.body


    const updatedBlog = await 
    Blog
        .findByIdAndUpdate(request.params.id, {$push: {"comments": body.comment }}, {new: true})
        .populate("user")

    response.json(updatedBlog)
})

// delete blog by :id
blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).send()
})

module.exports = blogsRouter