import { Observable } from 'rxjs'
import { IJokeModel } from './model.interface'
import { ICreateJokeValidator } from './validator.interface'

export interface IJokeService {
    getAll(): Observable<IJokeModel>

    save(input: ICreateJokeValidator): Observable<{ id: string }>

    getById(id: string): Observable<IJokeModel>

    deleteById(id: string): Observable<{ id: string }>

    like(id: string): Observable<IJokeModel>

    dislike(id: string): Observable<IJokeModel>
}
