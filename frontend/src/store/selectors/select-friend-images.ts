import { IImage } from '@/store/reducers/album-reducer'
import { IAppState } from '@/store/store'

export const selectFriendImages = (state: IAppState): IImage[] =>
	state.profileFriend.album.images
