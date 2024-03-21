import { IUser } from '@/store/reducers/profile-reducer'
import { IAppState } from '@/store/store'

export const selectProfileId = (state: IAppState): string => state.user.id
