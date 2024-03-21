import { IAppState } from '@/store/store'

export const selectIsEditAvatar = (state: IAppState) => state.session.isEditAvatar
