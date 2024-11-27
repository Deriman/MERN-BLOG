const errorHandle = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
}

const validationError = (statusCode, message) => {
    const err = new Error()
    err.statusCode = statusCode
    err.message = message
    return err
}

export {
    errorHandle,
    validationError
}