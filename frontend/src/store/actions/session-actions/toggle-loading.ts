import { TOGGLE_LOADING } from '@/store/consts'
import { AppActionTypes } from '@/store/types'

export type ToggleLoadingType = {
	type: typeof TOGGLE_LOADING
	payload: { isLoading: boolean }
}
export const toggleLoading = (isLoading: boolean): AppActionTypes => {
	return {
		type: TOGGLE_LOADING,
		payload: { isLoading },
	}
}
