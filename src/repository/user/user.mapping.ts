import { IRepositoryMapping } from '../../common/interface/repository.interface'
import { IUserModel } from '../../domain/user/interface/model.interface'
import { IUserSchema } from './user.schema'
import { UserBuilder } from '../../domain/user/user.builder'
import { ObjectId } from 'mongodb'
import * as _ from 'lodash'

export class UserRepositoryMapping implements IRepositoryMapping<IUserModel, IUserSchema> {
    public deserialize(schema: IUserSchema): IUserModel {

        const userFactory = new UserBuilder(schema.userName)

        userFactory
            .id(schema._id.toHexString())
            .name(schema.name)
            .email(schema.email)
            .encryptedPassword(schema.password, schema.salt)
            .suspended(schema.suspended)
            .createdDate(new Date(schema.createdDate))
            .updatedDate(new Date(schema.updatedDate))

        return userFactory.build()
    }

    public serialize(model: IUserModel): IUserSchema {
        return {
            _id: _.isEmpty(model.getId()) ? new ObjectId() : new ObjectId(model.getId()),
            email: model.getEmail(),
            name: model.getName(),
            password: model.getPassword(),
            salt: model.getSalt(),
            userName: model.getUserName(),
            suspended: model.isSuspended(),
            createdDate: model.getCreatedDate().getTime(),
            updatedDate: model.getUpdatedDate().getTime(),
        }
    }

}
