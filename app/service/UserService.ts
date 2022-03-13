import User from "../model/User";

class UserService {
    getUser() {
        return User.findOne()
    }

    getUserById(uid: number) {
        return User.findByPk(uid)
    }

    getUserListByPage(currentPage: number = 1, pageSize: number = 15) {
        return User.findAndCountAll({
            limit: pageSize,
            offset: (currentPage - 1) * pageSize
        })
    }

    getUserByName(name: string) {
        return User.findOne({
            where: {
                name: name
            }
        })
    }

}

export default new UserService