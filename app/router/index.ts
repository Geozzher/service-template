import koaRouter from 'koa-router'
import indexController from '../controller/IndexController'
import loginController from '../controller/LoginController'
import userController from '../controller/UserController'
const router = new koaRouter()

router.get('/', indexController.index)
router.post('/login', loginController.index)
router.get('/user/list', userController.getUserList)

export default router