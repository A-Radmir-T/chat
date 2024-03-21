import { IFriendProfile } from '@/store/reducers/profile-friend-reducer'
import { IUser } from '@/store/reducers/profile-reducer'
import { IAppState } from '@/store/store'

export const selectProfileFriend = (state: IAppState): IFriendProfile =>
	state.profileFriend
