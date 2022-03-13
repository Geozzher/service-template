import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import config from "../app/config";

function sign(data: any) {
    console.log(data);
    
    return jwt.sign(data, config.jwt.jwt_secret as string, { expiresIn: config.jwt.jwt_expire })
}


function verify(token: string): {user: JwtPayload | string | null, error: TokenExpiredError | JsonWebTokenError | null} {
    try {
        const decoded = jwt.verify(token, config.jwt.jwt_secret as string)
        return {
            user: decoded,
            error: null
        }
    } catch (error) {
        return {
            user: null,
            error:error as TokenExpiredError | JsonWebTokenError | null
        }
    }
}

export {
    sign,
    verify
}