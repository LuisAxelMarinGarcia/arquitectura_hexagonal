let tokenBlacklist = {};

function addToBlacklist(token) {
    const expiration = jwt.decode(token).exp;
    tokenBlacklist[token] = expiration;
}

function isTokenBlacklisted(token) {
    return !!tokenBlacklist[token];
}

function removeExpiredTokens() {
    const now = Math.floor(Date.now() / 1000); 
    tokenBlacklist = Object.entries(tokenBlacklist)
                            .filter(([token, exp]) => exp > now)
                            .reduce((acc, [token, exp]) => ({ ...acc, [token]: exp }), {});
}

setInterval(removeExpiredTokens, 60 * 60 * 1000);
module.exports = { addToBlacklist, isTokenBlacklisted };
