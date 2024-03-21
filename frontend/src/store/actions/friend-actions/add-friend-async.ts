import { friendService } from '@/services/friend.service'
import { ADD_FRIEND } from '@/store/consts'
import { ThunkActions } from '@/store/types'

export type AddFriendType = {
	type: typeof ADD_FRIEND
	payload: {
		friendId: string
	}
}

export const addFriendAsync = (id: string): ThunkActions => {
	return async (dispatch) => {
		try {
			await friendService.addFriend(id)
			dispatch({
				type: ADD_FRIEND,
				payload: {
					friendId: id,
				},
			})
		} catch (error) {
			console.log(error)
		}
	}
}
