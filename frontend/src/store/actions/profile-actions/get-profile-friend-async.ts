import { AxiosError } from 'axios'

import { userService } from '@/services/user.service'
import { IFriend, IStatusUser } from '@/shared/interfaces/profile.interface'
import { toggleLoading } from '@/store/actions/session-actions/toggle-loading'
import { AUTH_ERROR, GET_PROFILE_FRIEND } from '@/store/consts'
import { IAlbum } from '@/store/reducers/album-reducer'
import { IUser } from '@/store/reducers/profile-reducer'
import { ThunkActions } from '@/store/types'

export type GetProfileFriendType = {
	type: typeof GET_PROFILE_FRIEND
	payload: {
		user: IUser
		album: IAlbum
		friends: IFriend[]
		currentStatusUser: IStatusUser
	}
}

export const getProfileFriendAsync = (id: string): ThunkActions => {
	return async (dispatch) => {
		dispatch(toggleLoading(true))
		try {
			const userData = sessionStorage.getItem(id)
			if (userData) {
				dispatch({
					type: GET_PROFILE_FRIEND,
					payload: {
						...JSON.parse(userData),
					},
				})
				dispatch(toggleLoading(false))
			}
			const data = await userService.getProfileFriend(id)
			if (data) {
				sessionStorage.setItem(data.user.id, JSON.stringify(data))
				dispatch({
					type: GET_PROFILE_FRIEND,
					payload: {
						...data,
					},
				})
			}
		} catch (e) {
			if (e instanceof AxiosError) {
				const { error } = e.response?.data
				if (error === 'USER_NOT_EXIST') {
					dispatch({
						type: AUTH_ERROR,
						payload: {
							error: 'Такой пользователь не существует',
						},
					})
				}
			}
		} finally {
			dispatch(toggleLoading(false))
		}
	}
}
