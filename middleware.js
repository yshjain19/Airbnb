module.exports.isloggidn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be loggdin");
        req.session.redirectUrl = req.originalUrl;
        return res.redirect("/login");
    }
    next();
}

module.exports.isredirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.isredirectUrl = req.session.redirectUrl;
    }
    next();
}