import { $axios } from '@/shared/api'
import { IEditProfile } from '@/shared/interfaces/auth.interface'
import { IDialog } from '@/shared/interfaces/message.interface'
import { IFriend, IProfile } from '@/shared/interfaces/profile.interface'
import { IImage } from '@/store/reducers/album-reducer'
import { IFriendProfile } from '@/store/reducers/profile-friend-reducer'
import { IUser } from '@/store/reducers/profile-reducer'

export const userService = {
	get profile(): IProfile | null {
		const userData = localStorage.getItem('user')
		const albumData = localStorage.getItem('album')
		const friendsData = localStorage.getItem('friends')
		const dialogsData = localStorage.getItem('dialogs')
		if (userData && albumData && friendsData && dialogsData) {
			const user: IUser = JSON.parse(userData)
			const album: IImage[] = JSON.parse(albumData)
			const friends: IFriend[] = JSON.parse(friendsData)
			const dialogs: IDialog[] = JSON.parse(dialogsData)
			return {
				user,
				album,
				friends,
				dialogs,
			}
		}
		return null
	},
	async editProfile(data: IEditProfile): Promise<IUser | undefined> {
		return await $axios.patch('/edit', data).then((response) => response.data.user)
	},

	async getProfileFriend(id: string): Promise<IFriendProfile | undefined> {
		try {
			return await $axios.get(`/profile/${id}`).then((response) => response.data)
		} catch (err) {
			throw err
		}
	},
	async getUserById(id: string): Promise<IUser | undefined> {
		try {
			return await $axios.get(`/user/${id}`).then((response) => response.data.user)
		} catch (err) {
			console.log(err)
		}
	},
	async getProfile(): Promise<IProfile | undefined> {
		try {
			return await $axios.get<IProfile>(`/profile`).then((response) => response.data)
		} catch (err) {
			console.log(err)
		}
	},
	async searchUsers(searchPhrase: string = ''): Promise<IUser[]> {
		return await $axios
			.get(`/users?search=${searchPhrase}`)
			.then((response) => response.data.users)
	},
}
