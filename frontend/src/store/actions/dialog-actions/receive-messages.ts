import { IMessage } from '@/shared/interfaces/message.interface'
import { RECEIVE_MESSAGES } from '@/store/consts'
import { AppActionTypes } from '@/store/types'

export type ReceiveMessagesType = {
	type: typeof RECEIVE_MESSAGES
	payload: {
		message: IMessage
	}
}

export const receiveMessages = (message: IMessage): AppActionTypes => {
	return {
		type: RECEIVE_MESSAGES,
		payload: { message },
	}
}
