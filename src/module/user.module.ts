import { Module } from '@nestjs/common'
import {
    userLogger,
    userRepositoryProviders,
    userService,
} from '../provider/user.provider'
import { UserController } from '../controller/user/user.controller'
import { LoginController } from '../controller/user/login.controller'

@Module({
    providers: [
        ...userRepositoryProviders,
        userService,
        userLogger,
    ],
    controllers: [
        UserController,
        LoginController,
    ],
    exports: [
        ...userRepositoryProviders,
        userLogger,
    ],
})
export class UserModule {
}
