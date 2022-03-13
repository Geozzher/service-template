import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export default class User extends Model {
    @Column({ primaryKey: true, type: DataType.STRING })
    id!: string

    @Column({ type: DataType.STRING })
    name!: string

    @Column({ type: DataType.NUMBER })
    mobile!: string

    @Column({ type: DataType.STRING })
    email!: string
}
