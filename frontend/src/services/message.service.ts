import { $axios } from '@/shared/api'
import { IDialog, IMessage, ISendMessage } from '@/shared/interfaces/message.interface'

export const messageService = {
	async sendMessage(message: ISendMessage) {
		await $axios.post(`/message`, { message })
	},
	async createDialog(friendId: string): Promise<IDialog | undefined> {
		return await $axios
			.post(`/dialogs`, { friendId })
			.then((response) => response.data.dialog)
	},
	async deleteDialog(dialogId: string): Promise<void> {
		return await $axios.delete(`/dialogs/${dialogId}`)
	},
	async getMessages(dialogId: string): Promise<IMessage[]> {
		return await $axios
			.get(`/msgs/${dialogId}`)
			.then((response) => response.data.messages)
	},
}
