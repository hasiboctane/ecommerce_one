const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise
            .resolve(fn(req, res, next))
            // .catch((error) => {
            //     res.status(500).json({
            //         message: error.message
            //     })
            // })
            .catch(next)
    }
}
export default asyncHandler;