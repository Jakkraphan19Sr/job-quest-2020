import { Module } from '@nestjs/common'
import { CommonModule } from './common.module'
import { JokeModule } from './joke.module'
import { UserModule } from './user.module'

@Module({
    imports: [
        CommonModule,
        JokeModule,
        UserModule,
    ],
})

export class MainModule {
}
