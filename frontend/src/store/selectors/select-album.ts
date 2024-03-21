import { IAlbum, IImage } from '@/store/reducers/album-reducer'
import { IAppState } from '@/store/store'

export const selectAlbum = (state: IAppState): IAlbum => state.album
