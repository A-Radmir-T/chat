import { IUser } from '@/store/reducers/profile-reducer'

export interface IMessage {
	id: string
	dialogId: string
	text: string
	senderId: string
	isRead: boolean
	publishedAt: string
}

export interface ISendMessage {
	dialogId: string
	text: string
	publishedAt: string
}
export interface IDialog {
	id: string
	user: IUser
	message?: IMessage
	isRead: boolean
}
