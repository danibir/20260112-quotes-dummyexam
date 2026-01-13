const func = require('../js/functions')
const User = require('../model/mod-user')

const profile_get = async (req, res) => {
    let username = req.params.user
    username = username.slice(1)
    const find = await User.findOne({ username })
    if (find)
    {
        res.render('profile', { user: req.session.user || NaN, subject: find })
    }
    else
    {
        res.redirect('/')
    }
}
const login_get = (req, res) => {
    res.render('login', { user: req.session.user || NaN, data: {} })
}
const login_post = async (req, res) => {
    const user = await User.findOne({username: req.body.username})
    const verified = await user.verifyPassword(req.body.password)
    if (user && verified) 
    {
        req.session.user = {username: req.body.username}
        res.redirect(`/profile:${req.body.username}`)
        return
    }
    else
    {
        data = {}
        func.responseMessage(data, "errormsg", "Username or password incorrect.", "bad")
        res.render('/login', { user: NaN, data})
    }
}
const signup_get = (req, res) => {
    res.render('signup', { user: req.session.user || NaN, data: {} })
}
const signup_post = async (req, res) => {
    if (req.body.password != req.body.password2)
    {
        data = {}
        func.responseMessage(data, "errormsg", "Passwords don't match.", "bad")
        res.render('signup', { user: NaN, data })
    }
    const occupied = await User.findOne({ username: req.body.username })
    if (!occupied)
    {
        const newUser = new User(req.body)
        await newUser.save()
        req.session.user = {username: newUser.username}
        res.redirect(`/profile:${newUser.username}`)
    }
    else
    {
        data = {}
        func.responseMessage(data, "errormsg", "Username already taken...", "bad")
        res.render('signup', { user: NaN, data })
    }
}
const logout_get = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}
const deleteUser_post = async (req, res) =>{
    await User.findOneAndDelete({ username: req.session.user.username })
    res.redirect('/log-out')
}

module.exports = {
    profile_get,
    login_get,
    login_post,
    signup_get,
    signup_post,
    logout_get,
    deleteUser_post
}