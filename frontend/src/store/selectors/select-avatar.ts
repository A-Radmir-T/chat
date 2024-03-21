import { IAvatar } from '@/shared/interfaces/image.interface'
import { IAppState } from '@/store/store'

export const selectAvatar = (state: IAppState): IAvatar => state.user.avatar
