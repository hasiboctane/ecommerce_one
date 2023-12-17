const responseErrorMessage = (status, message) => {
    return {
        status,
        success: false,
        message
    }
}
export default responseErrorMessage