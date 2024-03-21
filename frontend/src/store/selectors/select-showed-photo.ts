import { IAppState } from '@/store/store'

export const selectShowedPhoto = (state: IAppState): string => state.session.showPhoto
