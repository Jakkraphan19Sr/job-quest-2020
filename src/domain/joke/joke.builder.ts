import { JokeModel } from './joke.model'

export class JokeBuilder {
    private readonly model: JokeModel

    constructor() {
        this.model = new JokeModel()
    }

    public builder(): JokeModel {
        return this.model
    }

    public setId(id: string) {
        this.model.setId(id)
        return this
    }

    public setContent(content: string) {
        this.model.setContent(content)
        return this
    }

    public setCratedBy(cratedBy: string) {
        this.model.setCreatedBy(cratedBy)
        return this
    }

    public setCreatedAt(cratedAt: Date) {
        this.model.setCreatedAt(cratedAt)
        return this
    }

    public setUpdatedAt(updatedAt: Date) {
        this.model.setUpdatedAt(updatedAt)
        return this
    }

    public setUpdatedBy(updateBy: string) {
        this.model.setUpdatedBy(updateBy)
        return this
    }

    public setLike(like: boolean) {
        this.model.setLike(like)
        return this
    }
}
