import { IDialog, IMessage } from '@/shared/interfaces/message.interface'
import {
	CLEAR_MESSAGES,
	CREATE_DIALOG,
	DELETE_DIALOG,
	GET_MESSAGES,
	GET_PROFILE,
	READ_MESSAGES,
	RECEIVE_MESSAGES,
	UPDATE_DIALOG,
} from '@/store/consts'
import { AppActionTypes } from '@/store/types'

export interface IDialogs {
	dialogs: IDialog[]
	messages: IMessage[]
}

export const initialDialogState: IDialogs = {
	dialogs: [],
	messages: [],
}

export const dialogReducer = (state = initialDialogState, action: AppActionTypes) => {
	switch (action.type) {
		case GET_PROFILE:
			return {
				...state,
				dialogs: [...action.payload.dialogs],
			}
		case CREATE_DIALOG:
			return {
				...state,
				dialogs: [...state.dialogs, action.payload.dialog],
			}
		case DELETE_DIALOG:
			const dialogs = state.dialogs.filter((dialog) => dialog.id !== action.payload.id)
			return {
				...state,
				dialogs: [...dialogs],
			}
		case CLEAR_MESSAGES:
			return {
				...state,
				messages: [],
			}
		case GET_MESSAGES:
			return {
				...state,
				messages: action.payload.messages,
			}
		case UPDATE_DIALOG: {
			const filteredDialog = state.dialogs.filter(
				(dialog) => dialog.id !== action.payload.dialog.id,
			)
			return {
				...state,
				dialogs: [...filteredDialog, action.payload.dialog],
			}
		}
		case RECEIVE_MESSAGES:
			const updatedDialog = state.dialogs.map((dialog) => {
				if (dialog.id === action.payload.message.dialogId) {
					return {
						...dialog,
						message: action.payload.message,
					}
				}
				return dialog
			})
			return {
				...state,
				messages: [...state.messages, action.payload.message],
				dialogs: updatedDialog,
			}
		case READ_MESSAGES: {
			const { messageId } = action.payload
			const updatedMessage = state.messages.map((message) => {
				if (message.id === messageId) {
					return {
						...message,
						isRead: true,
					}
				}
				return message
			})
			const updatedDialog = state.dialogs.map((dialog) => {
				if (dialog.message?.id === messageId) {
					return {
						...dialog,
						isRead: true,
						message: {
							...dialog.message,
							isRead: true,
						},
					}
				}
				console.log(updatedDialog)
				return dialog
			})
			return {
				...state,
				dialogs: updatedDialog,
				messages: updatedMessage,
			}
		}
		default:
			return state
	}
}
