import {
	ADD_IMAGE,
	DELETE_IMAGE,
	GET_ALBUM,
	GET_PROFILE,
	UPDATE_AVATAR,
} from '@/store/consts'
import { AppActionTypes } from '@/store/types'

export interface IImage {
	id?: string
	fullSize: string
	smallSize: string

	publishedAt: string
}
export interface IAlbum {
	images: IImage[]
}

const album = localStorage.getItem('album')

const initialUserState: IAlbum = album
	? JSON.parse(album)
	: {
			images: [],
	  }

export const albumReducer = (
	state = initialUserState,
	action: AppActionTypes,
): IAlbum => {
	switch (action.type) {
		case UPDATE_AVATAR:
			return {
				...state,
				images: [action.payload.images, ...state.images],
			}
		case GET_ALBUM:
			return {
				...state,
				...action.payload,
			}
		case GET_PROFILE:
			return {
				...state,
				...action.payload.album,
			}
		case DELETE_IMAGE:
			const filtered = state.images.filter((image) => image.id !== action.payload.id)
			return {
				...state,
				images: [...filtered],
			}
		case ADD_IMAGE:
			return {
				...state,
				images: [action.payload.image, ...state.images],
			}
		default:
			return state
	}
}
