import { Rules } from 'async-validator'
import { Context } from 'koa'
import { sign } from '../../utils/auth'
import { fail, success } from '../../utils/response'
import validate from '../../utils/validate'
import UserService from '../service/UserService'

class LoginController {
    async index(ctx: Context) {
        
        const rules: Rules = {
            name: [{
                type: 'string',
                required: true,
                message: "用户名不可以为空"
            }],
            password: [{
                type: 'string',
                required: true,
                message: "密码不可以为空"
            }],
        }

        interface IUser {
            name: string
            password: string
        }
        

        const { data, error } = await validate<IUser>(ctx, rules)
        if(error !== null) {
            return fail(ctx, error)
        }
        
        const user = await UserService.getUserByName(data.name)
        if (user == null) {
            fail(ctx, "用户不存在")
            return
        }
        const token = sign({...user})
        success(ctx, { token })
    }
}

export default new LoginController