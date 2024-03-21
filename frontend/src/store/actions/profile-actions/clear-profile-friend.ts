import { CLEAR_PROFILE_FRIEND } from '@/store/consts'
import { AppActionTypes } from '@/store/types'

export type ClearProfileFriendType = {
	type: typeof CLEAR_PROFILE_FRIEND
}

export const clearProfileFriend = (): AppActionTypes => {
	return {
		type: CLEAR_PROFILE_FRIEND,
	}
}
