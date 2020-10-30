import {
    ICreateUserValidator,
    IUpdateUserValidator,
} from '../../domain/user/interface/validator.interface'
import {
    ArrayUnique,
    IsDefined,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator'
import * as _ from 'lodash'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserValidator implements ICreateUserValidator {
    @ApiProperty({ type: String, description: 'email', example: 'test@me.com', required: true })
    @IsOptional()
    @IsEmail()
    private readonly email: string

    @ApiProperty({ type: String, description: 'name', example: 'thai_joke', required: true })
    @IsDefined()
    @IsString()
    @MinLength(4)
    private readonly name: string

    @ApiProperty({ type: String, description: 'password', example: '12345678', required: true })
    @IsDefined()
    @IsString()
    @MinLength(6)
    private readonly password: string

    @ApiProperty({ type: String, description: 'username', example: 'test1234', required: true })
    @IsDefined()
    @IsString()
    @MinLength(6)
    private readonly username: string

    public getEmail(): string {
        return this.email
    }

    public getName(): string {
        return this.name
    }

    public getPassword(): string {
        return this.password
    }

    public getUsername(): string {
        return this.username
    }

}

export class UpdateUserValidator implements IUpdateUserValidator {
    @IsDefined()
    @ArrayUnique()
    @IsNotEmpty()
    @IsString({
        each: true,
    })
    private readonly roles: string[]

    public getRoles(): string[] {
        return _.slice(this.roles)
    }

}
