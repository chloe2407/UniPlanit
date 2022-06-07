const User = require('../models/user')
module.exports.register = async (req, res, next) => {
    const user = new User(req.body)
    const { password } = req.body
    // register user with passport js
    console.log(user)
    await user.save()
    // login user then redirect to previous page or home
    res.redirect(app.locals.returnUrl || '/')
}

module.exports.login = async (req, res, next) => {
    // login code
    res.redirect(app.locals.returnUrl || '/')
}

module.exports.logout = async (req, res, next) => {
    req.session.destroy()
    // logout goes here

    // return to home
    res.redirect('/')
}