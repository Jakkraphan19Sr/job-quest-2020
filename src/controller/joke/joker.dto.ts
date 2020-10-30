import { IJokeModel } from '../../domain/joke/interface/model.interface'
import * as _ from 'lodash'

export interface IJokeSchemaDTO {
    id: string
    content: string
    createdAt: number
    createdBy: string
    updatedAt: number
    updatedBy: string
    like: boolean
}

export class JokeDto {
    public static toJokeDto(model: IJokeModel): IJokeSchemaDTO {
        let createdAt = 0
        let updatedAt = 0
        if (!_.isNil(model.getCreatedAt())) {
            createdAt = model.getCreatedAt().getTime()
        }
        if (!_.isNil(model.getUpdatedAt())) {
            updatedAt = model.getUpdatedAt().getTime()
        }
        return {
            id: model.getId(),
            content: model.getContent(),
            createdBy: model.getCreatedBy(),
            createdAt,
            updatedBy: model.getUpdatedBy(),
            updatedAt,
            like: model.getLike(),
        }
    }
}
