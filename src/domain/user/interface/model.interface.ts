import { IEntity } from '../../../common/interface/entity.interface'
import { PermissionEnum } from './permission.enum'

export interface IUserModel extends IEntity {
    getName(): string

    getUserName(): string

    getEmail(): string

    setName(name: string): void

    setEmail(email: string): void

    setUserName(user: string): void

    setSuspend(flag: boolean): void

    isSuspended(): boolean

    setPassword(password: string): string

    challengePassword(password: string): boolean

    getPassword(): string

    getSalt(): string

    getCreatedDate(): Date

    getUpdatedDate(): Date

}
