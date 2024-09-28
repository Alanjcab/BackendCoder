export const checkRole = (req, res, next) => {
    const { role } = req.user;
    if (role !== 'admin' && role !== 'premium') {
        return res.status(403).json({ msg: 'No tenes permiso para crear productos.' });
    }
    next();
};