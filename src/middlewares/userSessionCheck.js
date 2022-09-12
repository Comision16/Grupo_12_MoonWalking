module.exports = (req, res, next) => req.session.processLogin ? next () : res.redirect('/users/profile');


/*module.exports = (req, res, next) =>{
    req.session.userLogin 
    res.redirect('/users/login');
     next ()
} */