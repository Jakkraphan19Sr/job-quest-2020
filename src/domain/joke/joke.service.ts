import { IJokeService } from './interface/service.interface'
import {
    Observable,
    of,
} from 'rxjs'
import { IJokeModel } from './interface/model.interface'
import { IJokeRepository } from './interface/repository.interface'
import {
    concatMap,
    map,
    mergeMap,
    throwIfEmpty,
} from 'rxjs/operators'
import {
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { JokeBuilder } from './joke.builder'
import { ICreateJokeValidator } from './interface/validator.interface'

export class JokeService implements IJokeService {
    constructor(
        private readonly _jokeRepository: IJokeRepository,
    ) {
        console.log('fibonacci =', this.fibonacci(1))
        console.log('fibonacci =', this.fibonacci(3))
        console.log('fibonacci =', this.fibonacci(12))
        console.log('fizzbuzz =', JokeService.fizzbuzz(21))
        console.log('fizzbuzz =', JokeService.fizzbuzz(25))
        console.log('fizzbuzz =', JokeService.fizzbuzz(45))
        console.log('secondMax =', JokeService.secondMax([ 2, 3, 4, 5 ]))
        console.log('secondMax =', JokeService.secondMax([ 9, 2, 21, 21 ]))
        console.log('secondMax =', JokeService.secondMax([ 4, 4, 4, 4 ]))
        console.log('secondMax =', JokeService.secondMax([ 4123 ]))
        console.log('secondMax =', JokeService.secondMax([]))
        console.log('shift =', JokeService.shift([ 1, 2, 3, 4, 5 ], 'right', 3))
        console.log('shift =', JokeService.shift(['john', 'jane', 'sarah', 'alex'], 'left', 2))
    }

    public getAll(): Observable<IJokeModel> {
        return this._jokeRepository.getAll().pipe(
            throwIfEmpty(() => {
                throw new HttpException(`Joke Not Found`, HttpStatus.NOT_FOUND)
            }),
        )
    }

    public save(input: ICreateJokeValidator): Observable<{ id: string }> {
        return of(input).pipe(
            map((model) => {
                const builder = new JokeBuilder()
                builder
                    .setContent(model.getContent())
                    .setCreatedAt(new Date())
                    .setCratedBy(model.getCreatedBy())
                return builder.builder()
            }),
            concatMap((model: IJokeModel) => {
                return this._jokeRepository.save(model)
            }),
        )
    }

    public getById(id: string): Observable<IJokeModel> {
        return this._jokeRepository.getById(id).pipe(
            throwIfEmpty(() => {
                throw new HttpException(
                    'Joke not found',
                    HttpStatus.NOT_FOUND,
                )
            }),
        )
    }

    public deleteById(id: string): Observable<{ id: string }> {
        return this._jokeRepository.delete(id)
    }

    public dislike(id: string): Observable<IJokeModel> {
        return this._jokeRepository.getById(id).pipe(
            mergeMap(model => {
                model.setLike(false)
                return this._jokeRepository.update(model).pipe(
                    map(() => model),
                )
            }),
        )
    }

    public like(id: string): Observable<IJokeModel> {
        return this._jokeRepository.getById(id).pipe(
            mergeMap(model => {
                model.setLike(true)
                return this._jokeRepository.update(model).pipe(
                    map(() => model),
                )
            }),
        )
    }

    private fibonacci(n: number, memo: Map<number, number> = new Map()): number {
        if (n === 0) {
            return 0
        }
        if (n === 1) {
            return 1
        }

        if (memo.has(n)) {
            return memo.get(n)
        }
        const fn = this.fibonacci(n - 1, memo) + this.fibonacci(n - 2, memo)
        memo.set(n, fn)
        return fn
    }

    private static fizzbuzz(n: number): any {
        switch (true) {
            case (n % 5 === 0 && n % 3 === 0):
                return 'FizzBuzz'
            case n % 3 === 0:
                return 'Fizz'
            case n % 5 === 0:
                return 'Buzz'
            default:
                return n
        }
    }

    private static secondMax(arr: any[]): any {
        if (arr.length > 1) {
            let max = 0
            let result = 0
            for (const value of arr) {
                const nr = Number(value)

                if (nr > max) {
                    [ result, max ] = [ max, nr ]// save previous max
                } else if (result === 0) {
                    result = nr
                } else if (nr < max && nr > result) {
                    result = nr // new second biggest
                }
            }
            return result
        } else if (arr.length === 1) {
            return parseInt(arr.toString(), 10)
        } else {
            return 'Error!'
        }
    }

    private static shift(arr: any[], direction: any, n: any): any {
        let position
        if (direction === 'left') {
            position = 0
        } else if (direction === 'right') {
            position = 1
        } else {
            return 'Error direction'
        }
        const times = n > arr.length ? n % arr.length : n
        return arr.concat(arr.splice(0, (position > 0 ? arr.length - times : times)))
    }
}
