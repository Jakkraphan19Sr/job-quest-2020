import { IEntity } from '../../../common/interface/entity.interface'

export interface IJokeModel extends IEntity {
    getContent(): string

    getCreatedAt(): Date

    getCreatedBy(): string

    getUpdatedAt(): Date

    getUpdatedBy(): string

    getLike(): boolean

    setLike(like: boolean): void

    setContent(content: string): void

    setCreatedAt(createdAt: Date): void

    setCreatedBy(createdBy: string): void

    setUpdatedAt(updatedAt: Date): void

    setUpdatedBy(updatedBy: string): void
}
