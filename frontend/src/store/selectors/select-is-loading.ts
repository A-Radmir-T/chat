import { IAppState } from '@/store/store'

export const selectIsLoading = (state: IAppState) => state.session.loading
