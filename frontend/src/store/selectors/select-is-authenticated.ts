import { IAppState } from '@/store/store'

export const selectIsAuthenticated = (state: IAppState): boolean =>
	state.session.isAuthenticated
