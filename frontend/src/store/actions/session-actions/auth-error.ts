import { AUTH_ERROR } from '@/store/consts'
import { AppActionTypes } from '@/store/types'

export type AuthErrorType = {
	type: typeof AUTH_ERROR
	payload: { error: string }
}
export const authError = (error: string): AppActionTypes => {
	return {
		type: AUTH_ERROR,
		payload: { error },
	}
}
