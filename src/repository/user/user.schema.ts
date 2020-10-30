import { ObjectId } from 'mongodb'

export interface IUserSchema {
    _id: ObjectId
    name: string
    userName: string
    salt: string
    email: string
    suspended: boolean
    password: string
    createdDate: number
    updatedDate: number
}
