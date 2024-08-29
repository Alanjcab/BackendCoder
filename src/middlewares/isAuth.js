export const isAuth = (req, res, next) => {
    if (req.session.passport && req.session.passport.user) {
        if (req.isAuthenticated()) return next();
    }
    res.status(403).json({ msg: "No Autorizado" });
};