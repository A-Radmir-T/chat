import { IAvatar } from '@/shared/interfaces/image.interface'
import {
	DELETE_AVATAR,
	GET_PROFILE,
	LOGIN,
	REGISTER,
	UPDATE_AVATAR,
	UPDATE_USER,
} from '@/store/consts'
import { AppActionTypes } from '@/store/types'

export interface IUser {
	id: string
	email: string
	firstName: string
	lastName: string
	avatar: IAvatar
}

const user = localStorage.getItem('user')
const initialUserState: IUser = user
	? JSON.parse(user)
	: {
			id: '',
			email: '',
			firstName: '',
			lastName: '',
			avatar: { imageId: '', path: '' },
	  }

export const profileReducer = (
	state = initialUserState,
	action: AppActionTypes,
): IUser => {
	switch (action.type) {
		case LOGIN:
		case UPDATE_USER:
		case REGISTER:
			return {
				...state,
				...action.payload.user,
			}
		case UPDATE_AVATAR:
			return {
				...state,
				avatar: {
					...action.payload.avatar,
				},
			}
		case DELETE_AVATAR:
			return {
				...state,
				avatar: { imageId: '', path: '' },
			}
		case GET_PROFILE:
			return {
				...state,
				...action.payload.user,
			}
		default:
			return state
	}
}
