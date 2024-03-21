import { imageService } from '@/services/image.service'
import { toggleLoading } from '@/store/actions/session-actions/toggle-loading'
import { DELETE_AVATAR } from '@/store/consts'
import { ThunkActions } from '@/store/types'

export type DeleteAvatarAsyncType = {
	type: typeof DELETE_AVATAR
}
export const deleteAvatarAsync = (): ThunkActions => {
	return async (dispatch, getState) => {
		dispatch(toggleLoading(true))
		try {
			await imageService.deleteAvatar()
			dispatch({
				type: DELETE_AVATAR,
			})
			localStorage.setItem('album', JSON.stringify(getState().album))
		} catch (error) {
			console.log(error)
		} finally {
			dispatch(toggleLoading(false))
		}
	}
}
