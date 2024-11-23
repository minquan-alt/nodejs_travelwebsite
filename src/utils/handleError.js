// util/errorHandler.js
function handleError(err) {
    console.error(err)
    return {
        success: false,
        message: 'An error occurred',
        details: err.message,
    }
}

module.exports = handleError
