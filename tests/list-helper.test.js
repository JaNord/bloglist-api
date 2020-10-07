const listHelper = require("../utils/list_helper")

const blog1 =  {
    title: "blog1",
    author: "",
    url: "",
    likes: 1
}

const blog2 =  {
    title: "blog2",
    author: "",
    url: "",
    likes: 2
}

const blog3 =  {
    title: "blog3",
    author: "",
    url: "",
    likes: 3
}

const blogList = [blog1, blog2, blog3]

test("Dummy returns 1", () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe("totalLikes", () => {

    test("of 1 value is the value itself", () => {

        expect(listHelper.totalLikes([blog1])).toEqual(1)
    })

    test("should calculate correct sum", () => {
        expect(listHelper.totalLikes(blogList)).toEqual(6)
    })

    test("of empty array should be 0", () => {
        expect(listHelper.totalLikes([])).toEqual(0)
    })
})

describe("favouriteBlog", () => {
 
    test("of one item should return the item itself", () => {
        expect(listHelper.favoriteBlog([blog1])).toEqual(blog1)
    })

    test("of array should return item with most likes", () => {
        expect(listHelper.favoriteBlog(blogList)).toEqual(blog3)
    })
    test("of empty array should return null", () => {
        expect(listHelper.favoriteBlog([])).toEqual(null)
    })
})