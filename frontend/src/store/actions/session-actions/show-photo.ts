import { SHOW_PHOTO } from '@/store/consts'
import { IImage } from '@/store/reducers/album-reducer'
import { AppActionTypes } from '@/store/types'

export type ShowPhotoType = {
	type: typeof SHOW_PHOTO
	payload: { id: string }
}
export const showPhoto = (imageId: string): AppActionTypes => {
	return {
		type: SHOW_PHOTO,
		payload: { id: imageId },
	}
}
