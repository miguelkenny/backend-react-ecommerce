import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.token

        if (authHeader) {
            const token = authHeader.split(' ')[1]

            jwt.verify(token, process.env.JWT_SEC, (err, user) => {
                if (err) res.status(403).json('Token invalido!')
                req.user = user
                next()
            })
        } else {
            return res.status(401).json('No esta auntenticado!')
        }
    } catch (error) {
        log.error(error)
    }
}

export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else req.status(403).json('No tiene permiso de acceso')
    })
}

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else req.status(403).json('No tiene permiso de acceso')
    })
}