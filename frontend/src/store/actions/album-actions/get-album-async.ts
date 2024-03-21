import { imageService } from '@/services/image.service'
import { GET_ALBUM } from '@/store/consts'
import { IImage } from '@/store/reducers/album-reducer'
import { ThunkActions } from '@/store/types'

export type GetAlbumType = {
	type: typeof GET_ALBUM
	payload: IImage[]
}
export const getAlbumAsync = (): ThunkActions => {
	return async (dispatch) => {
		try {
			const album = await imageService.getAlbum()
			if (album) {
				dispatch({
					type: GET_ALBUM,
					payload: {
						...album,
					},
				})
			}
		} catch (error) {
			console.log(error)
		}
	}
}
