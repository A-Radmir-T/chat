import { CLEAR_MESSAGES } from '@/store/consts'
import { AppActionTypes } from '@/store/types'

export type ClearMessagesType = {
	type: typeof CLEAR_MESSAGES
}

export const clearMessages = (): AppActionTypes => {
	return {
		type: CLEAR_MESSAGES,
	}
}
