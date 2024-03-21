import { imageService } from '@/services/image.service'
import { toggleLoading } from '@/store/actions/session-actions/toggle-loading'
import { ADD_IMAGE } from '@/store/consts'
import { IImage } from '@/store/reducers/album-reducer'
import { ThunkActions } from '@/store/types'

export type addImageAsyncType = {
	type: typeof ADD_IMAGE
	payload: { image: IImage }
}

export const addImageAsync = (formData: FormData): ThunkActions => {
	return async (dispatch, getState) => {
		dispatch(toggleLoading(true))
		try {
			const data = await imageService.addImage(formData)
			if (data) {
				dispatch({
					type: ADD_IMAGE,
					payload: { image: data },
				})
			}
			localStorage.setItem('album', JSON.stringify(getState().album))
		} catch (error) {
			console.log(error)
		} finally {
			dispatch(toggleLoading(false))
		}
	}
}
