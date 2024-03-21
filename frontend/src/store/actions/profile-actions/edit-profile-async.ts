import { userService } from '@/services/user.service'
import { IEditProfile } from '@/shared/interfaces/auth.interface'
import { toggleLoading } from '@/store/actions/session-actions/toggle-loading'
import { UPDATE_USER } from '@/store/consts'
import { IUser } from '@/store/reducers/profile-reducer'
import { ThunkActions } from '@/store/types'

export type EditProfileType = {
	type: typeof UPDATE_USER
	payload: { user: IUser }
}

export const editProfileAsync = (data: IEditProfile): ThunkActions => {
	return async (dispatch) => {
		dispatch(toggleLoading(true))
		try {
			const updatedUser = await userService.editProfile(data)
			if (updatedUser) {
				dispatch({
					type: UPDATE_USER,
					payload: {
						user: updatedUser,
					},
				})
			}
		} catch (error) {
			console.log(error)
		} finally {
			dispatch(toggleLoading(false))
		}
	}
}
