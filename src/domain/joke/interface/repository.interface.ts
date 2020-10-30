import { Observable } from 'rxjs'
import { IJokeModel } from './model.interface'

export interface IJokeRepository {
    save(model: any): Observable<{ id: string }>

    getAll(filter?: any): Observable<IJokeModel>

    getById(id: string): Observable<IJokeModel>

    delete(id: string): Observable<{ id: string }>

    update(model: IJokeModel): Observable<{ id: string }>
}
