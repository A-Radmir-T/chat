import { imageService } from '@/services/image.service'
import { toggleLoading } from '@/store/actions/session-actions/toggle-loading'
import { DELETE_AVATAR, DELETE_IMAGE, GET_ALBUM, UPDATE_USER } from '@/store/consts'
import { ThunkActions } from '@/store/types'

export type DeleteImageAsyncType = {
	type: typeof DELETE_IMAGE
	payload: { id: string }
}
export const deleteImageAsync = (id: string): ThunkActions => {
	return async (dispatch, getState) => {
		dispatch(toggleLoading(true))
		try {
			await imageService.deleteImage(id)
			if (getState().user.avatar.imageId === id) {
				dispatch({
					type: DELETE_AVATAR,
				})
			}
			dispatch({
				type: DELETE_IMAGE,
				payload: {
					id,
				},
			})
			localStorage.setItem('album', JSON.stringify(getState().album))
		} catch (error) {
			console.log(error)
		} finally {
			dispatch(toggleLoading(false))
		}
	}
}
