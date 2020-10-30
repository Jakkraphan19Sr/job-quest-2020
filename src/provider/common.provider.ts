import { Provider } from '@nestjs/common'
import { providerNames } from './provider.name'
import * as Config from 'config'
import {
    Db,
    MongoClient,
} from 'mongodb'
import { IConfig } from '../common/interface/config.interface'
import * as _ from 'lodash'
import { Auth } from '../common/auth'

export const mongoConnection: Provider = {
    provide: providerNames.MONGO_CONNECTION,
    useFactory: async (config: IConfig): Promise<Db> => {
        if (config && config.mongodb) {
            const mongoConfig = config.mongodb
            const servers = process.env.MONGO_URL || mongoConfig.servers
            let auth = ''
            if (mongoConfig.username || mongoConfig.password) {
                auth = `${mongoConfig.username}:${mongoConfig.password}@`
            }
            let url: string = 'mongodb://' + auth + servers
                .split(',')
                .map((server: string) => {
                    return server + ':' + mongoConfig.port
                })
                .toString() + '/' + mongoConfig.dbName

            if (mongoConfig.authSource) {
                url += `?authSource=${mongoConfig.authSource}`
            }
            return await MongoClient.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
                .then((client: MongoClient) => client.db(mongoConfig.dbName))
        }

        return Promise.reject('Cannot connect MongoDB')
    },
    inject: [
        providerNames.CONFIG,
    ],
}

export const commonProviders: Provider[] = [
    {
        provide: providerNames.CONFIG,
        useFactory: (): IConfig => Config.util.toObject(),
    },
]

export const environmentConfig: Provider = {
    provide: providerNames.CONFIG,
    useFactory: () => {
        const configFile: IConfig = Config.util.toObject()
        const processEnv = process.env
        configFile.mongodb.servers = processEnv.DB_HOST || configFile.mongodb.servers
        configFile.mongodb.username = processEnv.DB_USERNAME || configFile.mongodb.username
        configFile.mongodb.password = processEnv.DB_PASSWORD || configFile.mongodb.password
        configFile.mongodb.dbName = processEnv.DB_DATABASE || configFile.mongodb.dbName
        configFile.mongodb.port = _.toNumber(processEnv.DB_PORT) || configFile.mongodb.port
        return configFile
    },
}

export const authServiceProvider: Provider = {
    provide: providerNames.AUTH_SERVICE,
    inject: [
        providerNames.CONFIG,
    ],
    useFactory: (
        config: IConfig,
    ) => {
        return new Auth(config)
    },
}
