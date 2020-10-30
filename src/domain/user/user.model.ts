import { Entity } from '../../common/entity'
import { IUserModel } from './interface/model.interface'
import * as Crypto from 'crypto'

export class UserModel extends Entity implements IUserModel {
    private _name: string
    private _user: string
    private _salt: string
    private _email: string
    private _suspended: boolean
    private _password: string
    private readonly _createdDate: Date
    private readonly _updatedDate: Date

    constructor(userName: string) {
        super()
        this._generateNewSalt()
        this._user = userName
        this._name = ''
        this._email = ''
        this._suspended = true
        this._password = ''
        this._createdDate = new Date()
        this._updatedDate = new Date()
    }

    private _generateNewSalt() {
        this._salt = Crypto.randomBytes(24).toString('hex')
    }

    public getName(): string {
        return this._name
    }

    public getUserName(): string {
        return this._user
    }

    public getEmail(): string {
        return this._email
    }

    public setName(name: string) {
        this._name = name
    }

    public setEmail(email: string) {
        this._email = email
    }

    public setUserName(user: string) {
        this._user = user
    }

    public getPassword(): string {
        return this._password
    }

    public getSalt(): string {
        return this._salt
    }

    public setSuspend(flag: boolean): void {
        this._suspended = flag
    }

    public challengePassword(password: string): boolean {
        const buffer = Crypto.pbkdf2Sync(
            password,
            this._salt,
            12000,
            64,
            'sha256')
        return buffer.toString('hex') === this._password

    }

    public setPassword(password: string): string {
        this._generateNewSalt()
        const buffer = Crypto.pbkdf2Sync(
            password,
            this._salt,
            12000,
            64,
            'sha256')
        this._password = buffer.toString('hex')
        return this._password
    }

    public isSuspended(): boolean {
        return this._suspended
    }

    public getCreatedDate(): Date {
        return new Date(this._createdDate)
    }

    public getUpdatedDate(): Date {
        return new Date(this._updatedDate)
    }

}
