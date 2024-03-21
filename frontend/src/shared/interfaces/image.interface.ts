import { IImage } from '@/store/reducers/album-reducer'

export interface IAvatar {
	path: string
	imageId: string
}
export interface IUpdateAvatarResponse {
	images: IImage
	avatar: IAvatar
}
