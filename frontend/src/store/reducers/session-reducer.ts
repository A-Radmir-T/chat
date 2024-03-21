import { authService } from '@/services/auth.service'
import {
	AUTH_ERROR,
	GET_PROFILE,
	GET_PROFILE_FRIEND,
	LOGIN,
	LOGOUT,
	REGISTER,
	SHOW_PHOTO,
	SWITCH_AVATAR_EDITOR,
	TOGGLE_LOADING,
} from '@/store/consts'
import { AppActionTypes } from '@/store/types'

export interface ISession {
	loading: boolean
	userId: string
	isAuthenticated: boolean
	isEditAvatar: boolean
	showPhoto: string
	errorMessage: string
}

const initialSessionState: ISession = {
	userId: '',
	isAuthenticated: authService.isAuthenticated(),
	loading: false,
	isEditAvatar: false,
	showPhoto: '',
	errorMessage: '',
}

export const sessionReducer = (
	state = initialSessionState,
	action: AppActionTypes,
): ISession => {
	switch (action.type) {
		case GET_PROFILE_FRIEND:
			return {
				...state,
				errorMessage: '',
			}
		case LOGIN:
		case REGISTER:
			return {
				...state,
				isAuthenticated: action.payload.isAuthenticated,
				userId: action.payload.user.id || '',
				errorMessage: '',
			}
		case LOGOUT:
			return {
				...initialSessionState,
				isAuthenticated: false,
			}
		case SWITCH_AVATAR_EDITOR:
			return {
				...state,
				isEditAvatar: action.payload.isEditAvatar,
			}
		case TOGGLE_LOADING:
			return {
				...state,
				loading: action.payload.isLoading,
			}
		case SHOW_PHOTO:
			return {
				...state,
				showPhoto: action.payload.id,
			}
		case AUTH_ERROR: {
			return {
				...state,
				errorMessage: action.payload.error,
			}
		}
		default:
			return state
	}
}
