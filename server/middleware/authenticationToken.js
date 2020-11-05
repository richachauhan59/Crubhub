const jwt = require('jsonwebtoken');

function authenticationToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                res.status(403).send(err.message);
            } else {
                req.user = user;
                next();
            }
        });
    } else {
        res.status(401).send('Missing auth token');
    }
}

module.exports = authenticationToken;
