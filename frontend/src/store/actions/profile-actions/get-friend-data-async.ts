import { userService } from '@/services/user.service'
import { toggleLoading } from '@/store/actions/session-actions/toggle-loading'
import { GET_FRIEND_DATA } from '@/store/consts'
import { IUser } from '@/store/reducers/profile-reducer'
import { ThunkActions } from '@/store/types'

export type GetFriendDataType = {
	type: typeof GET_FRIEND_DATA
	payload: {
		user: IUser
	}
}

export const getFriendDataAsync = (id: string): ThunkActions => {
	return async (dispatch) => {
		dispatch(toggleLoading(true))
		try {
			const data = await userService.getUserById(id)
			if (data) {
				dispatch({
					type: GET_FRIEND_DATA,
					payload: {
						user: data,
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
