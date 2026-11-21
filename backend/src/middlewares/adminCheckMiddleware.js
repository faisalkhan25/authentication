export const adminCheck = (req, res, next) => {
    const user = req.user;

    if(!user) {
        return res.status(401).json({
            message: "user not found"
        });
    }

    if(user.role !== "admin") {
        return res.status(401).json({
            message: "Not Authorized"
        });
    }

    next();
}