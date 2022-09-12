module.exports = (req, res, next) => {
    if(req.cookies.userMoonWalking) {
        req.session.userLogin = req.cookies.userMoonWalking
    }
    next()
}