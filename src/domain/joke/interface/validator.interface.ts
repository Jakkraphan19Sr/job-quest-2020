export interface ICreateJokeValidator {
    getContent(): string

    getCreatedAt(): Date

    getCreatedBy(): string

    setCreatedBy(createdBy: string): void
}
