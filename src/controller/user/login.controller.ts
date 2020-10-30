import {
    Controller,
    Get,
    Inject,
    LoggerService,
    Query,
    Req,
} from '@nestjs/common'
import { providerNames } from '../../provider'
import { IUserService } from '../../domain/user/interface/service.interface'
import {
    catchError,
    map,
    mergeMap,
} from 'rxjs/operators'
import { of } from 'rxjs'
import { UserDto } from './user.dto'
import { Request } from 'express'
import { IAuthService } from '../../common/interface/auth.interface'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('login')
@Controller('/login')
export class LoginController {
    constructor(
        @Inject(providerNames.USER_SERVICE)
        private readonly _userService: IUserService,
        @Inject(providerNames.AUTH_SERVICE)
        private readonly _auth: IAuthService,
        @Inject(providerNames.USER_BASIC_LOGGER)
        private readonly _userLogger: LoggerService,
    ) {
    }

    @Get('/')
    public login(
        @Query('username') username: string = '',
        @Query('password') password: string = '',
        @Req() req: Request,
    ) {
        return this._userService.challengeUserAccount(username, password).pipe(
            catchError(err => {
                this._userLogger.warn(`Authentication failed for ${username} from ${req.ip}`)
                throw err
            }),
            mergeMap(model => {
                this._userLogger.log(`Authentication success for ${username} from ${req.ip}`)
                // TODO refactor to switch map
                return of(model).pipe(
                    map((permissions) => {
                        return UserDto.toUserDto(permissions)
                    }),
                )
            }),
            mergeMap(data => {
                return this._auth.generateToken(data)
            }),
        )
    }

    public refreshToken(
        @Query('refreshToken') refreshToken: string,
    ) {
        // todo refresh token
    }
}
