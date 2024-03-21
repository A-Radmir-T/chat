import { IStatusUser } from '@/shared/interfaces/profile.interface'
import { IAppState } from '@/store/store'

export const selectCurrentStatus = (state: IAppState): IStatusUser => {
	return state.profileFriend.currentStatusUser
}
