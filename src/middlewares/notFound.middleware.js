const notFound = (req, res, next) => {
    res.error({
        message: `Cannot ${req.method} ${req.url}`,
    }, 404)
}

module.exports = notFound;