import { messageService } from '@/services/message.service'
import { toggleLoading } from '@/store/actions/session-actions/toggle-loading'
import { DELETE_DIALOG } from '@/store/consts'
import { ThunkActions } from '@/store/types'

export type DeleteDialogType = {
	type: typeof DELETE_DIALOG
	payload: {
		id: string
	}
}

export const deleteDialogAsync = (dialogId: string): ThunkActions => {
	return async (dispatch) => {
		dispatch(toggleLoading(true))
		try {
			await messageService.deleteDialog(dialogId)
			dispatch({
				type: DELETE_DIALOG,
				payload: {
					id: dialogId,
				},
			})
		} catch (error) {
			console.log(error)
		} finally {
			dispatch(toggleLoading(false))
		}
	}
}
