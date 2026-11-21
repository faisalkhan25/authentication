


export const csrfTokenVerify = (req, res, next) => {
    const csrfTokenCookie = req.cookies.csrfToken;
    const csrfTokenHeader = req.headers["x-csrf-token"];

    if(!csrfTokenCookie || !csrfTokenHeader || (csrfTokenCookie !== csrfTokenHeader)) {
        return res.status(403).json({
            message: "CSRF Failed",
            code: "CSRF"
        })
    }

    next();

}