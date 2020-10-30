import { Observable } from 'rxjs'
import {
    ICreateUserValidator,
    IUpdateUserValidator,
} from './validator.interface'
import { IUserModel } from './model.interface'

export interface IUserService {
    getById(id: string): Observable<any>

    challengeUserAccount(username: string, password: string): Observable<IUserModel>

    getAll(): Observable<IUserModel>

    createNewUser(input: ICreateUserValidator): Observable<IUserModel>

    updateUser(id: string, input: IUpdateUserValidator): Observable<IUserModel>

    activateUser(id: string): Observable<IUserModel>

    deactivateUser(id: string): Observable<IUserModel>
}
