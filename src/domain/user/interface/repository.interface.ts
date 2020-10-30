import { Observable } from 'rxjs'
import { IUserModel } from './model.interface'
import { IRepository } from '../../../common/interface/repository.interface'

export interface IUserRepository extends IRepository<IUserModel> {
    getById(id: string): Observable<IUserModel>

    getByUsername(name: string): Observable<IUserModel>

    find(): Observable<IUserModel>

    save(model: IUserModel): Observable<{ id: string }>

    update(model: IUserModel): Observable<{ id: string }>
}


