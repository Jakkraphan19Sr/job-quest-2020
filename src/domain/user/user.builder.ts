import { UserModel } from './user.model'

export class UserBuilder {
    private readonly _model: UserModel

    constructor(userName: string) {
        this._model = new UserModel(userName)
    }

    public id(id: string) {
        this._model.setId(id)
        return this
    }

    public name(name: string) {
        this._model.setName(name)
        return this
    }

    public email(email: string) {
        this._model.setEmail(email)
        return this
    }

    public suspended(suspended: boolean) {
        this._model.setSuspend(suspended)
        return this
    }

    public password(password: string) {
        this._model.setPassword(password)
        return this
    }

    public encryptedPassword(password: string, salt: string) {
        Object.assign(this._model, {
            _password: password,
            _salt: salt,
        })
        return this
    }

    public createdDate(date: Date) {
        Object.assign(this._model, {
            _createdDate: date,
        })
        return this
    }

    public updatedDate(date: Date) {
        Object.assign(this._model, {
            _updatedDate: date,
        })
        return this
    }

    public build(): UserModel {
        return this._model
    }
}
