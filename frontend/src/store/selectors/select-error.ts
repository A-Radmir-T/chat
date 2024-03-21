import { IAppState } from '@/store/store'

export const selectError = (state: IAppState): string => state.session.errorMessage
