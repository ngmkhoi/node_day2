const responseMiddleware = ( req, res, next ) => {
    res.success = (data, status = 200) => {
        res.status(status).json({
            status: 'success',
            data: data
        });
    };

    res.error = (error, status = 500) => {
        res.status(status).json({
            status: 'error',
            error: error,
        })
    };

    next();
}

module.exports = responseMiddleware;