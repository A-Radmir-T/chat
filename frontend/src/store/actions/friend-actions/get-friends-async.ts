import { friendService } from '@/services/friend.service'
import { IFriend } from '@/shared/interfaces/profile.interface'
import { GET_FRIENDS } from '@/store/consts'
import { ThunkActions } from '@/store/types'

export type GetFriendsType = {
	type: typeof GET_FRIENDS
	payload: {
		friends: IFriend[]
	}
}

export const getFriendsAsync = (): ThunkActions => {
	return async (dispatch) => {
		try {
			const friends = await friendService.getFriends()

			dispatch({
				type: GET_FRIENDS,
				payload: { friends },
			})
		} catch (error) {
			console.log(error)
		}
	}
}
