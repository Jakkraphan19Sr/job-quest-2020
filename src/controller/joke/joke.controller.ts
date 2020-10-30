import {
    Body,
    Controller,
    Get,
    Inject,
    Headers,
    Post,
    UseGuards,
    Param,
    Delete,
} from '@nestjs/common'
import { providerNames } from '../../provider'
import { IJokeService } from '../../domain/joke/interface/service.interface'
import {
    map,
    reduce,
} from 'rxjs/operators'
import { IJokeModel } from '../../domain/joke/interface/model.interface'
import { JokeDto } from './joker.dto'
import { JokeValidator } from './joke.validator'
import * as _ from 'lodash'
import * as jwt from 'jsonwebtoken'
import { ProfileGuard } from '../../common/guard/profile.guard'
import {
    ApiBody,
    ApiCreatedResponse,
    ApiHeader,
    ApiTags,
} from '@nestjs/swagger'

@ApiTags('Joke')
@Controller('/joke')
export class JokeController {
    constructor(
        @Inject(providerNames.JOKE_SERVICE)
        private readonly _jokeService: IJokeService,
    ) {
    }

    @UseGuards(ProfileGuard)
    @Get('/')
    @ApiHeader({ name: 'x-profile' })
    public getAll() {
        const dtoTemplate = {
            total: 0,
            data: [],
        }
        return this._jokeService.getAll().pipe(
            reduce((acc, model: IJokeModel) => {
                if (!_.isNil(model)) {
                    ++acc.total
                    acc.data.push(JokeDto.toJokeDto(model))
                }
                return acc
            }, dtoTemplate),
        )
    }

    @UseGuards(ProfileGuard)
    @Post('/')
    @ApiCreatedResponse({ description: 'Joke Created' })
    @ApiBody({ type: JokeValidator })
    @ApiHeader({ name: 'x-profile' })
    public createJoke(
        @Headers('x-profile') token,
        @Body() body: JokeValidator,
    ) {
        if (!_.isEmpty(token)) {
            console.log(token)
            const profile: any = jwt.decode(token)
            const username = profile.userName
            console.log(username)
            body.setCreatedBy(username)
        }
        return this._jokeService.save(body)

    }

    @UseGuards(ProfileGuard)
    @Get('/:id')
    @ApiHeader({ name: 'x-profile' })
    public getById(
        @Param('id') id: string,
    ) {
        return this._jokeService.getById(id).pipe(
            map((model: IJokeModel) => {
                return JokeDto.toJokeDto(model)
            }),
        )
    }

    @UseGuards(ProfileGuard)
    @Delete('/:id')
    @ApiHeader({ name: 'x-profile' })
    public deleteById(
        @Param('id') id: string,
    ) {
        return this._jokeService.deleteById(id)
    }

    @UseGuards(ProfileGuard)
    @Post('/:id/like')
    @ApiHeader({ name: 'x-profile' })
    public like(
        @Param('id') id: string,
    ) {
        return this._jokeService.like(id).pipe(
            map((model: IJokeModel) => {
                return JokeDto.toJokeDto(model)
            }),
        )
    }

    @UseGuards(ProfileGuard)
    @Post('/:id/dislike')
    @ApiHeader({ name: 'x-profile' })
    public dislike(
        @Param('id') id: string,
    ) {
        return this._jokeService.dislike(id).pipe(
            map((model: IJokeModel) => {
                return JokeDto.toJokeDto(model)
            }),
        )
    }
}
