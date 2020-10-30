import { Module } from '@nestjs/common'
import {
    jokeRepositoryProvider,
    jokeServiceProvider,
} from '../provider'
import { JokeController } from '../controller/joke/joke.controller'

@Module({
    providers: [
        ...jokeRepositoryProvider,
        jokeServiceProvider,
    ],
    controllers: [
        JokeController,
    ],
    exports: [],
})

export class JokeModule {
}
