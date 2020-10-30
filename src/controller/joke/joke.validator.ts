import { ICreateJokeValidator } from '../../domain/joke/interface/validator.interface'
import { IsDefined } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class JokeValidator implements ICreateJokeValidator {

    @ApiProperty({ type: String, description: 'content', example: 'test', required: true })
    @IsDefined()
    private readonly content: string

    private readonly createdAt: Date
    private createdBy: string

    public getContent(): string {
        return this.content
    }

    public getCreatedAt(): Date {
        return this.createdAt
    }

    public getCreatedBy(): string {
        return this.createdBy
    }

    public setCreatedBy(createdBy: string): void {
        this.createdBy = createdBy
    }

}
