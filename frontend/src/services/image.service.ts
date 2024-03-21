import { $axios } from '@/shared/api'
import { IUpdateAvatarResponse } from '@/shared/interfaces/image.interface'
import { IImage } from '@/store/reducers/album-reducer'

export const imageService = {
	async updateAvatar(formData: FormData): Promise<IUpdateAvatarResponse | undefined> {
		try {
			return await $axios.post('/upload/avatar', formData).then((response) => {
				return response.data
			})
		} catch (e) {
			console.log(e)
		}
	},

	async getAlbum(): Promise<IImage[]> {
		const data = await $axios.get('/album').then((response) => response.data)
		localStorage.setItem('album', JSON.stringify(data.album))
		return data.album
	},

	async addImage(formData: FormData): Promise<IImage> {
		return await $axios.post('/upload/image', formData).then((response) => {
			return response.data.image
		})
	},

	async deleteImage(id: string): Promise<void> {
		return await $axios.delete(`/upload/image/${id}`)
	},

	async deleteAvatar(): Promise<void> {
		return await $axios.delete(`/upload/avatar`)
	},
}
