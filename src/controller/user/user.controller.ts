import {
    Body,
    Controller,
    Get,
    Headers,
    Inject,
    Ip,
    Param,
    Post,
    Put,
} from '@nestjs/common'
import { providerNames } from '../../provider'
import { IUserService } from '../../domain/user/interface/service.interface'
import { map } from 'rxjs/operators'
import { UserDto } from './user.dto'
import { CreateUserValidator } from './user.validator'
import { Auth } from '../../common/auth'
import { IBasicLogger } from '../../common/interface/basic-logger.interface'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('user')
@Controller('/user')
export class UserController {
    constructor(
        @Inject(providerNames.USER_SERVICE)
        private readonly _userService: IUserService,
        @Inject(providerNames.AUTH_SERVICE)
        private readonly _auth: Auth,
        @Inject(providerNames.USER_BASIC_LOGGER)
        private readonly _logger: IBasicLogger,
    ) {
    }

    @Get('/logout')
    public logoutUser(
        @Headers('authorization') authorizationToken: string,
        @Ip() ip: string,
    ) {
        const data = this._auth.verifyToken(authorizationToken.replace(/Bearer\s/, ''))
        if (!!data) {
            this._logger.log(`User ${data.userName} logged out from ${ip}`)
        }
        return { success: true }

    }

    @Post('/')
    public createNewUser(
        @Body() payload: CreateUserValidator,
    ) {
        return this._userService.createNewUser(payload).pipe(
            map(model => UserDto.toUserDto(model)),
        )
    }

    @Put('/:id/activate')
    public activateUser(
        @Param('id') id: string,
    ) {
        return this._userService.activateUser(id).pipe(
            map(model => UserDto.toUserDto(model)),
        )
    }

    @Put('/:id/deactivate')
    public deactivateUser(
        @Param('id') id: string,
    ) {
        return this._userService.deactivateUser(id).pipe(
            map(model => UserDto.toUserDto(model)),
        )
    }
}
