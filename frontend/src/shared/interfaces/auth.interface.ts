import { IAvatar } from '@/shared/interfaces/image.interface'
import { IUser } from '@/store/reducers/profile-reducer'

export interface ILoginRequest {
	email: string
	password: string
}

export interface IRegRequest {
	email: string
	firstName: string
	lastName: string
	avatar: IAvatar
	password: string
}

export interface IEditProfile {
	firstName: string
	lastName: string
}
export interface IAuthResponse {
	accessToken: string
	expiresIn: number
	user: IUser
}

export interface IRefreshResponse {
	accessToken: string
	expiresIn: number
}
