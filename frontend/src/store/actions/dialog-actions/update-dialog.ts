import { IDialog } from '@/shared/interfaces/message.interface'
import { UPDATE_DIALOG } from '@/store/consts'
import { AppActionTypes } from '@/store/types'

export type UpdateDialogType = {
	type: typeof UPDATE_DIALOG
	payload: {
		dialog: IDialog
	}
}

export const updateDialog = (dialog: IDialog): AppActionTypes => {
	return {
		type: UPDATE_DIALOG,
		payload: { dialog },
	}
}
