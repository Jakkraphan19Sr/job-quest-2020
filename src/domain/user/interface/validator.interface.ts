import { PermissionEnum } from './permission.enum'

export interface ICreateUserValidator {
    getUsername(): string

    getName(): string

    getEmail(): string

    getPassword(): string

}

export interface IUpdateUserValidator {
    getRoles(): string[]

}

export interface ICreateRoleValidator {

    getId(): string

    getName(): string

    getPermissions(): PermissionEnum[]
}

export interface IUpdateRoleValidator {
    getPermissions(): PermissionEnum[]
}
