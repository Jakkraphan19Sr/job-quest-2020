import { IUserModel } from '../../domain/user/interface/model.interface'

export interface IUserDto {
    id: string
    name: string
    userName: string
    email: string
    isSuspended: boolean

}

export class UserDto {
    public static toUserDto(model: IUserModel): IUserDto {
        return {
            id: model.getId(),
            userName: model.getUserName(),
            name: model.getName(),
            email: model.getEmail(),
            isSuspended: model.isSuspended(),
        }
    }
}
