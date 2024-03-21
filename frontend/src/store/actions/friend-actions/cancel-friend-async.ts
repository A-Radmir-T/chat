import { friendService } from '@/services/friend.service'
import { CANCEL_FRIEND } from '@/store/consts'
import { ThunkActions } from '@/store/types'

export type CancelFriendType = {
	type: typeof CANCEL_FRIEND
	payload: {
		id: string
	}
}

export const cancelFriendAsync = (id: string): ThunkActions => {
	return async (dispatch) => {
		try {
			await friendService.cancelFriend(id)
			dispatch({
				type: CANCEL_FRIEND,
				payload: { id },
			})
		} catch (error) {
			console.log(error)
		}
	}
}
