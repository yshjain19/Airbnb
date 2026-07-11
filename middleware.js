module.exports.isloggidn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be loggdin");
        return res.redirect("/login");
    }
    next();
}