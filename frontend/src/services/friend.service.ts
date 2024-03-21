import { $axios } from '@/shared/api'
import { IFriend } from '@/shared/interfaces/profile.interface'

export const friendService = {
	async sendFriendRequest(id: string): Promise<IFriend> {
		return await $axios
			.post('/friends/request', { friendId: id })
			.then((response) => response.data.friend)
	},

	async addFriend(id: string): Promise<void> {
		return await $axios.put('/friends/add', { id })
	},
	async getFriends(): Promise<IFriend[]> {
		return await $axios.get('/friend').then((response) => response.data.friends)
	},

	async deleteFriend(id: string): Promise<IFriend> {
		return await $axios.delete(`/friends/${id}`).then((response) => {
			return response.data.friend
		})
	},
	async cancelFriend(id: string): Promise<void> {
		return await $axios.put(`/friends/cancel`, { id })
	},
}
