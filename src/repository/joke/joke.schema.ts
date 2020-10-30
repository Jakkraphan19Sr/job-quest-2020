import { ObjectId } from 'bson'
export interface IJokeSchema {
    _id: ObjectId
    content: string
    like: boolean
    createdAt: Date
    createdBy: string
    updatedAt: Date
    updatedBy: string
}
