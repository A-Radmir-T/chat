import { READ_MESSAGES } from '@/store/consts'
import { AppActionTypes } from '@/store/types'

export type UpdateMessagesType = {
	type: typeof READ_MESSAGES
	payload: {
		messageId: string
	}
}

export const updateMessage = (messageId: string): AppActionTypes => {
	return {
		type: READ_MESSAGES,
		payload: { messageId },
	}
}
