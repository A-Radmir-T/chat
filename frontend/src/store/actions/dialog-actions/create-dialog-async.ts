import { messageService } from '@/services/message.service'
import { IDialog } from '@/shared/interfaces/message.interface'
import { toggleLoading } from '@/store/actions/session-actions/toggle-loading'
import { CREATE_DIALOG } from '@/store/consts'
import { ThunkActions } from '@/store/types'

export type CreateDialogType = {
	type: typeof CREATE_DIALOG
	payload: {
		dialog: IDialog
	}
}

export const createDialogAsync = (friendId: string): ThunkActions => {
	return async (dispatch) => {
		dispatch(toggleLoading(true))
		try {
			const dialog = await messageService.createDialog(friendId)
			if (dialog) {
				dispatch({
					type: CREATE_DIALOG,
					payload: {
						dialog,
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
