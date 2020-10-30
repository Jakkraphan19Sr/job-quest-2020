import { MongoRepository } from '../../common/mongo-repository'
import { IUserModel } from '../../domain/user/interface/model.interface'
import { IUserRepository } from '../../domain/user/interface/repository.interface'
import {
    from,
    Observable,
} from 'rxjs'
import {
    Collection,
    Db,
    ObjectId,
} from 'mongodb'
import { IRepositoryMapping } from '../../common/interface/repository.interface'
import { IUserSchema } from './user.schema'
import {
    map,
    tap,
} from 'rxjs/operators'
import {
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import * as _ from 'lodash'

export class UserRepository extends MongoRepository<IUserModel> implements IUserRepository {
    constructor(db: Db, mapper: IRepositoryMapping<IUserModel, IUserSchema>) {
        super(
            db.collection<Collection<IUserSchema>>('user'),
            mapper,
        )
    }

    public find(): Observable<IUserModel> {
        const cursor = this._collection.find()
        return this.toObservable(cursor)
    }

    public save(model: IUserModel): Observable<{ id: string }> {
        const schema = this.toDocument(model)
        delete schema._id
        const promise = this._collection.insertOne(schema)
        return from(promise).pipe(
            map(result => {
                return { id: result.insertedId.toHexString() }
            }),
        )
    }

    public update(model: IUserModel): Observable<{ id: string }> {
        const id = new ObjectId(model.getId())
        const doc = this.toDocument(model)
        delete doc._id
        const updateOperator = {
            $set: doc,
        }
        const promise = this._collection.updateOne({
            _id: id,
        }, updateOperator)
        return from(promise).pipe(
            map((resp: any) => {
                if (_.get(resp, 'result.n') === 1) {
                    return {
                        id: model.getId(),
                    }
                    throw new HttpException('Update Error',
                        HttpStatus.INTERNAL_SERVER_ERROR)
                }
            }),
        )
    }

    public getById(id: string): Observable<IUserModel> {
        return this._findOneQuery({
            _id: new ObjectId(id),
        })

    }

    public getByUsername(name: string): Observable<IUserModel> {
        return this._findOneQuery({
            userName: name,
        })
    }

    private _findOneQuery(filter: any): Observable<IUserModel> {
        const promise = this._collection.findOne(filter)
        return from<Promise<IUserSchema>>(promise).pipe(
            tap((doc) => {
                if (_.isNil(doc)) {
                    throw new HttpException(
                        `User not found`,
                        HttpStatus.NOT_FOUND)

                }

            }),
            map((schema) => {
                return this.toModel(schema)
            }),
        )
    }
}
