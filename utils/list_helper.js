const dummy = (blogs) => (1)

const totalLikes = (blogs) => {

    const sumReducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(sumReducer, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0
        ? null
        : blogs.reduce((favourite, blog) => {
            if(!favourite) {
                return blog
            }

            if (blog.likes > favourite.likes) {
                return blog
            }

            return favourite
        }, null)
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}