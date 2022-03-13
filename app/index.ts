import dotenv from 'dotenv'
dotenv.config()

import db from '../app/db'
db()

import Koa from 'koa'
import router from './router/index'
import { Server } from 'http'

import AccessLogMiddleware from './middleware/AccessLogMiddleware'
import AuthMiddleware from './middleware/AuthMiddleware'

import koaBody from 'koa-body'
const app = new Koa()


app
    .use(koaBody({
        multipart: true,
        formidable: {
            maxFieldsSize: 200 * 1024 * 1024 // 设置上传文件大小
        }
    }
    ))
    .use(AccessLogMiddleware)
    // .use(AuthMiddleware)
    .use(router.routes())

const run = (port: any): Server => {
    return app.listen(port)
}

export default run