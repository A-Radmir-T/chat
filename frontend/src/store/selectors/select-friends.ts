import { IFriend } from '@/shared/interfaces/profile.interface'
import { IAlbum, IImage } from '@/store/reducers/album-reducer'
import { IAppState } from '@/store/store'

export const selectFriends = (state: IAppState): IFriend[] => state.friendList.users
