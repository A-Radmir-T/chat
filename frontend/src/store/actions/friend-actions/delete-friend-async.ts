import { friendService } from '@/services/friend.service'
import { IFriend } from '@/shared/interfaces/profile.interface'
import { DELETE_FRIEND } from '@/store/consts'
import { ThunkActions } from '@/store/types'

export type DeleteFriendType = {
	type: typeof DELETE_FRIEND
	payload: {
		friend: IFriend
	}
}

export const deleteFriendAsync = (id: string): ThunkActions => {
	return async (dispatch) => {
		try {
			const friend = await friendService.deleteFriend(id)
			dispatch({
				type: DELETE_FRIEND,
				payload: {
					friend,
				},
			})
		} catch (error) {
			console.log(error)
		}
	}
}
