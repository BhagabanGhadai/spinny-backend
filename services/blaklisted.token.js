const blackListModel = require('../API/user/models/blacklisttoken.model')

exports.BLACKLIST_CHECK=async (req, res, next) => {
    try {
        let token_type = req.headers.authorization.split(" ")[0]
        let token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return _throw401(res, 'Token is missing.')
        }
        if (token_type != 'Bearer') {
            return _throw401(res, 'Invalid Token Type')
        }
        let result = await blackListModel.findOne({ token: token })
        if (result) {
            return res.status(401).json({ error: 'Token is blacklisted' });
        }
        next();
    } catch (err) {
        console.error('Failed to validate token:', err);
        return res.status(500).json({ error: 'Failed to validate token' });
    }
}