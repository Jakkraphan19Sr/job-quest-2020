import { Entity } from '../../common/entity'
import { IJokeModel } from './interface/model.interface'

export class JokeModel extends Entity implements IJokeModel {
    private _content: string
    private _createdAt: Date
    private _createdBy: string
    private _updatedAt: Date
    private _updatedBy: string
    private _like: boolean

    constructor() {
        super()
    }

    public getContent(): string {
        return this._content
    }

    public getCreatedAt(): Date {
        return this._createdAt
    }

    public getCreatedBy(): string {
        return this._createdBy
    }

    public getUpdatedAt(): Date {
        return this._updatedAt
    }

    public getUpdatedBy(): string {
        return this._updatedBy
    }

    public setContent(content: string): void {
        this._content = content
    }

    public setCreatedAt(createdAt: Date): void {
        this._createdAt = createdAt
    }

    public setCreatedBy(createdBy: string): void {
        this._createdBy = createdBy
    }

    public setUpdatedAt(updatedAt: Date): void {
        this._updatedAt = updatedAt
    }

    public setUpdatedBy(updatedBy: string): void {
        this._updatedBy = updatedBy
    }

    public getLike(): boolean {
        return this._like
    }

    public setLike(like: boolean): void {
        this._like = like
    }

}
