import { userService } from '@/services/user.service'
import { IDialog } from '@/shared/interfaces/message.interface'
import { IFriend } from '@/shared/interfaces/profile.interface'
import { toggleLoading } from '@/store/actions/session-actions/toggle-loading'
import { GET_PROFILE } from '@/store/consts'
import { IImage } from '@/store/reducers/album-reducer'
import { IUser } from '@/store/reducers/profile-reducer'
import { ThunkActions } from '@/store/types'

export type GetProfileType = {
	type: typeof GET_PROFILE
	payload: {
		user: IUser
		album: IImage[]
		friends: IFriend[]
		dialogs: IDialog[]
	}
}

export const getProfileAsync = (): ThunkActions => {
	return async (dispatch) => {
		dispatch(toggleLoading(true))
		try {
			if (userService.profile) {
				const profile = userService.profile
				dispatch({
					type: GET_PROFILE,
					payload: {
						...profile,
					},
				})
				dispatch(toggleLoading(false))
			}
			const data = await userService.getProfile()
			if (data) {
				dispatch({
					type: GET_PROFILE,
					payload: {
						user: data.user,
						album: data.album,
						friends: data.friends,
						dialogs: data.dialogs,
					},
				})
				localStorage.setItem('user', JSON.stringify(data.user))
				localStorage.setItem('album', JSON.stringify(data.album))
				localStorage.setItem('friends', JSON.stringify(data.friends))
				localStorage.setItem('dialogs', JSON.stringify(data.dialogs))
			}
		} catch (error) {
			console.log(error)
		} finally {
			dispatch(toggleLoading(false))
		}
	}
}
