const errorhandler = (err, req, res, next) => {
    const status = err.statusCode || 500
    const message = err.message
    // const extraDetails = err.extraDetails || "Error from backend"
    return res.status(status).json({
        message,
        // extraDetails
    })
}
export default errorhandler;