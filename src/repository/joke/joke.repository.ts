import { MongoRepository } from '../../common/mongo-repository'
import { IJokeRepository } from '../../domain/joke/interface/repository.interface'
import {
    from,
    Observable,
} from 'rxjs'
import { IJokeModel } from '../../domain/joke/interface/model.interface'
import { Db } from 'mongodb'
import { IRepositoryMapping } from '../../common/repository.interface'
import { IJokeSchema } from './joke.schema'
import { map } from 'rxjs/operators'
import {
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { ObjectId } from 'bson'
import * as _ from 'lodash'

export class JokeRepository extends MongoRepository<IJokeModel> implements IJokeRepository {
    constructor(
        db: Db,
        mapping: IRepositoryMapping<IJokeModel, IJokeSchema>,
    ) {
        super(db.collection('joke'), mapping)
    }

    public save(model: any): Observable<{ id: string }> {
        const doc: IJokeSchema = this.toDocument(model)
        const promise = this._collection.insertOne(doc)
        return from(promise).pipe(
            map(result => {
                if (result.result.ok === 0) {
                    throw new HttpException(
                        `Cannot save Joke`,
                        HttpStatus.INTERNAL_SERVER_ERROR,
                    )
                }
                return {
                    id: result.insertedId.toHexString(),
                }
            }),
        )
    }

    public getAll(filter?: any): Observable<IJokeModel> {
        const cursor = this._collection.find(filter)
        return this.toObservable(cursor)
    }

    public getById(id: string): Observable<IJokeModel> {
        const query = {
            _id: new ObjectId(id),
        }
        const promise = this._collection.findOne(query)
        return from(promise).pipe(
            map(doc => {
                return this.toModel(doc)
            }),
        )
    }

    public delete(id: string): Observable<{ id: string }> {
        const query = {
            _id: new ObjectId(id),
        }
        const promise = this._collection.deleteOne(query)
        return from(promise).pipe(
            map((result) => {
                if (result.result.ok === 0) {
                    throw new HttpException(
                        `Cannot delete Joke`,
                        HttpStatus.BAD_REQUEST,
                    )
                }
                return {
                    id,
                }
            }),
        )
    }

    public update(model: IJokeModel): Observable<{ id: string }> {
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
                    throw new HttpException('Update Joke Error',
                        HttpStatus.INTERNAL_SERVER_ERROR)
                }
            }),
        )
    }

}
