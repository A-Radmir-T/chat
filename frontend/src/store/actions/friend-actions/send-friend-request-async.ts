import { friendService } from '@/services/friend.service'
import { IFriend } from '@/shared/interfaces/profile.interface'
import { SEND_FRIEND_REQUEST } from '@/store/consts'
import { ThunkActions } from '@/store/types'

export type SendFriendRequestType = {
	type: typeof SEND_FRIEND_REQUEST
	payload: {
		friend: IFriend
	}
}

export const sendFriendRequestAsync = (id: string): ThunkActions => {
	return async (dispatch) => {
		try {
			const data = await friendService.sendFriendRequest(id)
			dispatch({
				type: SEND_FRIEND_REQUEST,
				payload: {
					friend: data,
				},
			})
		} catch (error) {
			console.log(error)
		}
	}
}
