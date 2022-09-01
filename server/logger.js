module.exports = function logger(req, res, next) {
    console.log(`\x1b[42m${req.method} on ${req.originalUrl}\x1b[0m`)
    next()
}