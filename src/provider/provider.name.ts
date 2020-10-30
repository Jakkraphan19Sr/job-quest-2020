enum CommonProviderName {
    CONFIG = 'common-config-provider',
    MONGO_CONNECTION = 'mongo-connection-provider',
    CIPHER_SERVICE = 'cipher-service-provider',
    AUTH_SERVICE = 'auth-service',
}

enum JokeProviderName {
    JOKE_REPOSITORY = 'joke-repository-provider',
    JOKE_REPOSITORY_MAPPING = 'joke-repository-mapping-provider',
    JOKE_SERVICE = 'joke-service-provider',
}

enum UserProviderName {
    USER_REPOSITORY = 'user-repository-provider',
    USER_REPOSITORY_MAPPING = 'user-repository-mapping-provider',
    USER_SERVICE = 'user-service-provider',

    USER_BASIC_LOGGER = 'user-basic-logging-provider',

}

export const providerNames = Object.assign({},
    CommonProviderName,
    JokeProviderName,
    UserProviderName,
)
