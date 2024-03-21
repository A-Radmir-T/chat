import { SWITCH_AVATAR_EDITOR } from '@/store/consts'
import { AppActionTypes } from '@/store/types'

export type SwitchAvatarEditorType = {
	type: typeof SWITCH_AVATAR_EDITOR
	payload: { isEditAvatar: boolean }
}

export const switchAvatarEditor = (isEditAvatar: boolean): AppActionTypes => ({
	type: SWITCH_AVATAR_EDITOR,
	payload: { isEditAvatar },
})
