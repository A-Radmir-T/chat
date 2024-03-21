import { IDialog } from '@/shared/interfaces/message.interface'
import { IImage } from '@/store/reducers/album-reducer'
import { IUser } from '@/store/reducers/profile-reducer'

export interface IProfile {
	user: IUser
	album: IImage[]
	friends: IFriend[]
	dialogs: IDialog[]
}

export interface IFriend {
	id: string
	friendId: string
	firstName: string
	lastName: string
	avatar: { imageId: string; path: string }
	isAccepted: boolean
	senderId: string
}

export interface IStatusUser {
	id: string
	isAccepted: boolean
	senderId: string
}
