const User = require('../model/mod-user')

const authenticate = (req, res, next) => {
    console.info('initiate user auth (...)')
    const user = req.session.user
    if (!user) {
        console.warn('auth fail: user undefined, login redir')
        res.redirect('/login')
        return
    }
    const userExists = User.findOne({username: user.username})
    if (!userExists) {
        console.warn('auth error: 404 user not found, login redir')
        req.session.destroy()
        res.redirect('/login')
        return
    }
    console.info('auth success')
    next()
}
module.exports = {
    authenticate
}