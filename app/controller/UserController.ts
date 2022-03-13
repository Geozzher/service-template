import { Context } from 'koa'
import { URLSearchParams } from 'url'
import pagenate from '../../utils/pagenate'
import { success } from '../../utils/response'
import UserService from '../service/UserService'
class UserController {
    async get(ctx: Context) {
        const user = await UserService.getUser()
        ctx.body = user
    }

    async getUserList(ctx: Context) {
        const usp = new URLSearchParams(ctx.querystring)

        let page = 1, limit = 15
        if (usp.get("currentPage") !== null) {
            !isNaN(Number(usp.get("currentPage"))) && (page = Number(usp.get("currentPage")))
        }

        if (usp.get("pageSize") !== null) {
            !isNaN(Number(usp.get("pageSize"))) && (limit = Number(usp.get("pageSize")))
        }

        const { rows, count } = await UserService.getUserListByPage(page, limit)
        success(ctx, pagenate(rows, page, count, limit))
    }
}

export default new UserController