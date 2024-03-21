import { IFriend, IStatusUser } from '@/shared/interfaces/profile.interface'
import {
	ADD_FRIEND,
	CANCEL_FRIEND,
	CLEAR_PROFILE_FRIEND,
	DELETE_FRIEND,
	GET_FRIEND_DATA,
	GET_PROFILE_FRIEND,
	SEND_FRIEND_REQUEST,
} from '@/store/consts'
import { IAlbum } from '@/store/reducers/album-reducer'
import { IUser } from '@/store/reducers/profile-reducer'
import { AppActionTypes } from '@/store/types'

export interface IFriendProfile {
	user: IUser
	album: IAlbum
	friends: IFriend[]
	currentStatusUser: IStatusUser
}

const friend = localStorage.getItem('friend')
const initialUserState: IFriendProfile = friend
	? JSON.parse(friend)
	: {
			user: {
				id: '',
				email: '',
				firstName: '',
				lastName: '',
				gender: 'notSelected',
				dateOfBirth: '',
				avatar: { imageId: '', path: '' },
			},
			album: { images: [] },
			currentStatusUser: {},
			friends: [],
	  }

export const profileFriendReducer = (
	state = initialUserState,
	action: AppActionTypes,
): IFriendProfile => {
	switch (action.type) {
		case GET_PROFILE_FRIEND:
			return {
				...state,
				...action.payload,
			}
		case GET_FRIEND_DATA: {
			return {
				...state,
				user: action.payload.user,
			}
		}
		case CLEAR_PROFILE_FRIEND: {
			return {
				...initialUserState,
			}
		}
		case ADD_FRIEND:
			return {
				...state,
				currentStatusUser: {
					...state.currentStatusUser,
					isAccepted: true,
				},
			}
		case SEND_FRIEND_REQUEST:
			return {
				...state,
				currentStatusUser: {
					senderId: action.payload.friend.senderId,
					id: action.payload.friend.id,
					isAccepted: action.payload.friend.isAccepted,
				},
			}
		case CANCEL_FRIEND:
			return {
				...state,
				currentStatusUser: {
					...initialUserState.currentStatusUser,
				},
			}
		case DELETE_FRIEND:
			return {
				...state,
				currentStatusUser: {
					id: action.payload.friend.id,
					isAccepted: false,
					senderId: action.payload.friend.senderId,
				},
			}
		default:
			return state
	}
}
