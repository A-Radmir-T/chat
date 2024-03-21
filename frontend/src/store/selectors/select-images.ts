import { IImage } from '@/store/reducers/album-reducer'
import { IAppState } from '@/store/store'

export const selectImages = (state: IAppState): IImage[] => state.album.images
