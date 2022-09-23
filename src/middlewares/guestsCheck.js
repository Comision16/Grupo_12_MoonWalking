/*module.exports = (req, res, next) =>
{
    if(!req.locals.user)
    {
        next();
    }
    else {
        return res.redirect('/' + res.locals.user.userName);
    }
}*/

module.exports = (req, res, next) => !req.locals.user ? next() : res.redirect('/');