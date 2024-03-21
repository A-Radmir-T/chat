import { IAvatar } from '@/shared/interfaces/image.interface'
import { IDialog } from '@/shared/interfaces/message.interface'
import { IAppState } from '@/store/store'

export const selectDialogs = (state: IAppState): IDialog[] => state.messages.dialogs
