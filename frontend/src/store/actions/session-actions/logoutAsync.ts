import { authService } from '@/services/auth.service'
import { toggleLoading } from '@/store/actions/session-actions/toggle-loading'
import { LOGOUT } from '@/store/consts'
import { ThunkActions } from '@/store/types'

export type LogoutType = {
	type: typeof LOGOUT
}
export const logoutAsync = (): ThunkActions => {
	return async (dispatch) => {
		dispatch(toggleLoading(true))
		try {
			await authService.logout()
			dispatch({
				type: LOGOUT,
			})
			dispatch(toggleLoading(false))
		} catch (error) {
			console.log(error)
		}
	}
}
