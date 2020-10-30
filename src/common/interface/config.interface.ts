export interface IConfig {
    application: {
        port: number
    }
    mongodb: IMongoDB
    auth: IAuth
}

export interface IMongoDB {
    servers: string
    port: number
    dbName: string
    username?: string
    password?: string
    authSource?: string
    replicaSetName?: string
}

export interface IAuth {
    ignoreExpiration: boolean
    public: string
    private: string
}
