import { Provider } from '@nestjs/common'
import { providerNames } from './provider.name'
import { JokeRepositoryMapping } from '../repository/joke/joke.mapping'
import { Db } from 'mongodb'
import { IRepositoryMapping } from '../common/repository.interface'
import { IJokeModel } from '../domain/joke/interface/model.interface'
import { IJokeSchema } from '../repository/joke/joke.schema'
import { JokeRepository } from '../repository/joke/joke.repository'
import { IJokeRepository } from '../domain/joke/interface/repository.interface'
import { JokeService } from '../domain/joke/joke.service'

export const jokeRepositoryProvider: Provider[] = [
    {
        provide: providerNames.JOKE_REPOSITORY_MAPPING,
        useClass: JokeRepositoryMapping,
    },
    {
        provide: providerNames.JOKE_REPOSITORY,
        inject: [
            providerNames.MONGO_CONNECTION,
            providerNames.JOKE_REPOSITORY_MAPPING,
        ],
        useFactory: (
            db: Db,
            mapping: IRepositoryMapping<IJokeModel, IJokeSchema>,
        ) => {
            return new JokeRepository(db, mapping)
        },
    },
]

export const jokeServiceProvider: Provider = {
    provide: providerNames.JOKE_SERVICE,
    inject: [
        providerNames.JOKE_REPOSITORY,
    ],
    useFactory: (
        jokerRepository: IJokeRepository,
    ) => {
        return new JokeService(jokerRepository)
    },
}
