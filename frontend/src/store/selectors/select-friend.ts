import { IUser } from '@/store/reducers/profile-reducer'
import { IAppState } from '@/store/store'

export const selectFriend = (state: IAppState): IUser => state.profileFriend.user
