/* require("dotenv").config(); */
const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const verifyToken = async (bearerToken) => {

    const client = jwksClient({
        jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
    });
    
    function getKey(header, callback) {
        client.getSigningKey(header.kid, function (error, key) {
            const signingKey = key.publicKey || key.rsaPublicKey;
            callback(null, signingKey);
        });
    }

        return new Promise((resolve, reject) => {
            jwt.verify(
                bearerToken,
                getKey,
                {
                    audience: process.env.REACT_APP_AUDIENCE,
                    issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
                    algorithms: ["RS256"]
                },
               function (error, decoded) {
                    if (error) reject( error );
                        resolve( decoded );
                    
                }
            );
        });
        
}

module.exports = verifyToken;