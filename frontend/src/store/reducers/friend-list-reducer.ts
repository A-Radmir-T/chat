import { IFriend } from '@/shared/interfaces/profile.interface'
import {
	ADD_FRIEND,
	CANCEL_FRIEND,
	DELETE_FRIEND,
	GET_FRIENDS,
	GET_PROFILE,
	SEND_FRIEND_REQUEST,
} from '@/store/consts'
import { AppActionTypes } from '@/store/types'

export interface IFriends {
	users: IFriend[]
}

const initialFriendState: IFriends = {
	users: [],
}

export const friendListReducer = (
	state = initialFriendState,
	action: AppActionTypes,
): IFriends => {
	switch (action.type) {
		case GET_FRIENDS:
			return {
				...state,
				users: action.payload.friends,
			}
		case GET_PROFILE:
			return {
				...state,
				users: [...action.payload.friends],
			}
		case ADD_FRIEND:
			const newUserList: IFriend[] = state.users.map((user) => {
				if (user.id === action.payload.friendId) {
					user.isAccepted = true
				}
				return user
			})
			return {
				...state,
				users: newUserList,
			}
		case SEND_FRIEND_REQUEST:
			const friend = action.payload.friend
			return {
				...state,
				users: [...state.users, friend],
			}
		case CANCEL_FRIEND: {
			const newUserList: IFriend[] = state.users.filter(
				(user) => user.id !== action.payload.id,
			)
			return {
				...state,
				users: newUserList,
			}
		}
		case DELETE_FRIEND: {
			const friend = action.payload.friend
			const newUserList: IFriend[] = state.users.map((user) => {
				if (user.friendId === friend.friendId) {
					return friend
				}
				return user
			})
			return {
				...state,
				users: newUserList,
			}
		}
		default:
			return state
	}
}
