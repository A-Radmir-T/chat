import { IMessage } from '@/shared/interfaces/message.interface'
import { IAlbum, IImage } from '@/store/reducers/album-reducer'
import { IAppState } from '@/store/store'

export const selectMessages = (state: IAppState): IMessage[] => state.messages.messages
