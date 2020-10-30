import { IRepositoryMapping } from '../../common/repository.interface'
import { IJokeModel } from '../../domain/joke/interface/model.interface'
import { IJokeSchema } from './joke.schema'
import { ObjectId } from 'bson'
import * as _ from 'lodash'
import { JokeBuilder } from '../../domain/joke/joke.builder'

export class JokeRepositoryMapping implements IRepositoryMapping<IJokeModel, IJokeSchema> {
    public deserialize(schema: IJokeSchema): IJokeModel {
        const builderFactory = new JokeBuilder()
        builderFactory
            .setId(schema._id.toHexString())
            .setContent(schema.content)
            .setCratedBy(schema.createdBy)
            .setCreatedAt(schema.createdAt)
            .setUpdatedAt(schema.updatedAt)
            .setUpdatedBy(schema.updatedBy)
            .setLike(schema.like)
        return builderFactory.builder()
    }

    public serialize(model: IJokeModel): IJokeSchema {
        return {
            _id: !_.isNil(model.getId()) ? new ObjectId(model.getId()) : new ObjectId(),
            content: model.getContent(),
            createdAt: model.getCreatedAt(),
            createdBy: model.getCreatedBy(),
            updatedAt: model.getUpdatedAt(),
            updatedBy: model.getUpdatedBy(),
            like: model.getLike() || false,
        }
    }

}
