import { imageService } from '@/services/image.service'
import { IAvatar } from '@/shared/interfaces/image.interface'
import { toggleLoading } from '@/store/actions/session-actions/toggle-loading'
import { UPDATE_AVATAR } from '@/store/consts'
import { IImage } from '@/store/reducers/album-reducer'
import { ThunkActions } from '@/store/types'

export type UpdateAvatarType = {
	type: typeof UPDATE_AVATAR
	payload: { avatar: IAvatar; images: IImage }
}

export const updateAvatarAsync = (formData: FormData): ThunkActions => {
	return async (dispatch, getState) => {
		dispatch(toggleLoading(true))
		try {
			const data = await imageService.updateAvatar(formData)
			if (data) {
				dispatch({
					type: UPDATE_AVATAR,
					payload: { ...data },
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
