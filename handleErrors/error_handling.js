async function handleErrors(error, res) {
    return res.send({
        is_error: 1,
        error: error || 'Internal Server Error',
        status: 501
    })
}
module.exports = handleErrors;