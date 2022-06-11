module.exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated) return next()
    else {
        return res.redirect('http://localhost:3000/login')
    }
}