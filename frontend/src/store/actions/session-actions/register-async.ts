import { authService } from '@/services/auth.service'
import { IRegRequest } from '@/shared/interfaces/auth.interface'
import { toggleLoading } from '@/store/actions/session-actions/toggle-loading'
import { AUTH_ERROR, REGISTER } from '@/store/consts'
import { IUser } from '@/store/reducers/profile-reducer'
import { ThunkActions } from '@/store/types'

export type RegisterType = {
	type: typeof REGISTER
	payload: {
		user: IUser
		isAuthenticated: boolean
	}
}

export const registerAsync = (newUser: IRegRequest): ThunkActions => {
	return async (dispatch) => {
		dispatch(toggleLoading(true))
		authService
			.register(newUser)
			.then((response) => {
				if (response) {
					dispatch({
						type: REGISTER,
						payload: {
							user: response,
							isAuthenticated: authService.isAuthenticated(),
						},
					})
				}
			})
			.catch((e) => {
				const { error } = e.response?.data
				switch (error) {
					case 'EMAIL_EXISTS':
						dispatch({
							type: AUTH_ERROR,
							payload: {
								error: 'Такой пользователь существует',
							},
						})
						break
					default:
						console.error(error)
				}
			})
			.finally(() => {
				dispatch(toggleLoading(false))
			})
	}
}
