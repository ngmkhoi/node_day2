const errorHandler = (err, req, res, next) => {
    res.error({
        message: err.message,
    });
}


module.exports = errorHandler;