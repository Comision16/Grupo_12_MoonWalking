module.exports = (req, res, next) =>
{
    if(req.session.userLogin && req.session.userLogin.admin)
    {
        next();
    }
    else {
        return res.redirect('/');
    }
}
