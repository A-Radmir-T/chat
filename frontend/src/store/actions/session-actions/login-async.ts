import { AxiosError } from 'axios'

import { authService } from '@/services/auth.service'
import { ILoginRequest } from '@/shared/interfaces/auth.interface'
import { toggleLoading } from '@/store/actions/session-actions/toggle-loading'
import { AUTH_ERROR, LOGIN } from '@/store/consts'
import { IUser } from '@/store/reducers/profile-reducer'
import { ThunkActions } from '@/store/types'

export type LoginType = {
	type: typeof LOGIN
	payload: {
		user: IUser
		isAuthenticated: boolean
	}
}

export const loginAsync = (newUser: ILoginRequest): ThunkActions => {
	return async (dispatch) => {
		dispatch(toggleLoading(true))
		try {
			const response = await authService.login(newUser)
			if (response && response.id) {
				dispatch({
					type: LOGIN,
					payload: {
						user: response,
						isAuthenticated: authService.isAuthenticated(),
					},
				})
				dispatch(toggleLoading(false))
			}
		} catch (e) {
			if (e instanceof AxiosError) {
				const { error } = e.response?.data
				switch (error) {
					case 'INVALID_PASSWORD':
						dispatch({
							type: AUTH_ERROR,
							payload: {
								error: 'Не верный пароль',
							},
						})
						break
					case 'USER_NOT_FOUND':
						dispatch({
							type: AUTH_ERROR,
							payload: {
								error: 'Такой пользователь не найден',
							},
						})
						break
					default:
						console.error(error)
				}
			}
		}
	}
}
