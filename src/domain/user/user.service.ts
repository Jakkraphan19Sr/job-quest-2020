import { IUserModel } from './interface/model.interface'
import {
    ICreateUserValidator,
    IUpdateUserValidator,
} from './interface/validator.interface'
import { Observable } from 'rxjs'
import { IUserRepository } from './interface/repository.interface'
import { IUserService } from './interface/service.interface'
import { UserBuilder } from './user.builder'
import {
    defaultIfEmpty,
    filter,
    map,
    mergeMap,
    tap,
} from 'rxjs/operators'
import {
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import * as _ from 'lodash'

export class UserService implements IUserService {
    constructor(
        private readonly _userRepository: IUserRepository,
    ) {
    }

    public getAll(): Observable<IUserModel> {
        return this._userRepository.list(1, 0)
    }

    public getById(id: string): Observable<any> {
        return this._userRepository.getById(id)
    }

    public createNewUser(input: ICreateUserValidator): Observable<IUserModel> {
        return this._userRepository.find().pipe(
            filter(model => {
                return model.getUserName() === input.getUsername()
            }),
            tap(model => {
                if (!_.isNil(model)) {
                    throw new HttpException(
                        `User existed`,
                        HttpStatus.BAD_REQUEST,
                    )
                }
            }),
            defaultIfEmpty({}), // keep flow running if empty
            map(() => {
                const builder = new UserBuilder(input.getUsername())
                    .name(input.getName())
                    .email(input.getEmail())
                    .password(input.getPassword())
                return builder.build()
            }),
            mergeMap(newUser => {
                return this._userRepository.save(newUser)
            }),
            mergeMap(({ id }: { id: string }) => {
                return this._userRepository.getById(id)
            }),
        )
    }

    public updateUser(id: string, input: IUpdateUserValidator): Observable<IUserModel> {
        return this._userRepository.getById(id).pipe(
            mergeMap(userModel => {
                return this._userRepository.update(userModel).pipe(
                    tap(updateResult => {
                        if (!updateResult) {
                            throw new HttpException(
                                `Cannot update user ${userModel.getId()}`,
                                HttpStatus.INTERNAL_SERVER_ERROR,
                            )
                        }
                    }),
                    map(() => userModel),
                )
            }),
        )
    }

    public challengeUserAccount(username: string, password: string): Observable<IUserModel> {
        return this._userRepository.getByUsername(username).pipe(
            tap(model => {
                if (model.isSuspended() || !model.challengePassword(password)) {
                    throw new HttpException(
                        `Authentication failed`,
                        HttpStatus.UNAUTHORIZED,
                    )
                }
            }),
        )
    }

    public activateUser(id: string): Observable<IUserModel> {
        return this._userRepository.getById(id).pipe(
            mergeMap(model => {
                model.setSuspend(false)
                return this._userRepository.update(model).pipe(
                    map(() => model),
                )
            }),
        )
    }

    public deactivateUser(id: string): Observable<IUserModel> {
        return this._userRepository.getById(id).pipe(
            mergeMap(model => {
                model.setSuspend(true)
                return this._userRepository.update(model).pipe(
                    map(() => model),
                )
            }),
        )
    }

}
