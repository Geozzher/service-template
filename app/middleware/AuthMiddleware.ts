import { Context, Next } from "koa";
import { verify } from "../../utils/auth";


function AuthMiddleware(ctx: Context, next: Next) {
    const token = ctx.header['authorization']

    if (token !== undefined && token !== "") {
        const { error } = verify(token)
        if (error !== null) {
            ctx.body = {
                //@ts-ignore
                msg: error.message,
                code: 40000
            }
            return
        } else {
            return next()
        }

    }

    ctx.body = {
        msg: '缺乏有效的auth',
        code: 40000
    }
    return

}


export default AuthMiddleware