import { messageService } from '@/services/message.service'
import { IMessage } from '@/shared/interfaces/message.interface'
import { toggleLoading } from '@/store/actions/session-actions/toggle-loading'
import { GET_MESSAGES } from '@/store/consts'
import { ThunkActions } from '@/store/types'

export type GetMessagesType = {
	type: typeof GET_MESSAGES
	payload: {
		messages: IMessage[]
	}
}

export const getMessagesAsync = (dialogId: string): ThunkActions => {
	return async (dispatch) => {
		dispatch(toggleLoading(true))
		try {
			const messages = await messageService.getMessages(dialogId)
			if (messages.length) {
				dispatch({
					type: GET_MESSAGES,
					payload: {
						messages,
					},
				})
			}
		} catch (error) {
			console.log(error)
		} finally {
			dispatch(toggleLoading(false))
		}
	}
}
