import {
    Global,
    Module,
    Provider,
} from '@nestjs/common'
import {
    authServiceProvider,
    commonProviders,
    environmentConfig,
    mongoConnection,
} from '../provider'

const globalProviders: Provider[] = [
    authServiceProvider,
    ...commonProviders,
    mongoConnection,
    environmentConfig,
]

@Global()
@Module({
    providers: globalProviders,
    controllers: [],
    exports: globalProviders,
})
export class CommonModule {

}
