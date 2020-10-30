import { Provider } from '@nestjs/common'
import { providerNames } from './provider.name'
import { UserRepositoryMapping } from '../repository/user/user.mapping'
import { UserRepository } from '../repository/user'
import { Db } from 'mongodb'
import { IRepositoryMapping } from '../common/interface/repository.interface'
import { IUserModel } from '../domain/user/interface/model.interface'
import { IUserSchema } from '../repository/user/user.schema'
import { BasicLogger } from '../common/basic-logger'
import { IUserRepository } from '../domain/user/interface/repository.interface'
import { UserService } from '../domain/user/user.service'

export const userRepositoryProviders: Provider[] = [
    {
        provide: providerNames.USER_REPOSITORY_MAPPING,
        useClass: UserRepositoryMapping,
    },
    {
        provide: providerNames.USER_REPOSITORY,
        inject: [
            providerNames.MONGO_CONNECTION,
            providerNames.USER_REPOSITORY_MAPPING,
        ],
        useFactory: (
            db: Db,
            mapping: IRepositoryMapping<IUserModel, IUserSchema>,
        ) => {
            return new UserRepository(db, mapping)
        },
    },
]

export const userService: Provider = {
    provide: providerNames.USER_SERVICE,
    inject: [
        providerNames.USER_REPOSITORY,
    ],
    useFactory: (
        userRepository: IUserRepository,
    ) => {
        return new UserService(userRepository)
    },
}

export const userLogger: Provider = {
    provide: providerNames.USER_BASIC_LOGGER,
    useFactory: () => {
        return new BasicLogger('User', 'user.log')
    },
}
