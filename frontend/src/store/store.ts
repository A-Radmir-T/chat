import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import { IAlbum, IImage, albumReducer } from '@/store/reducers/album-reducer'
import { IDialogs, dialogReducer } from '@/store/reducers/dialog-reducer'
import { IFriends, friendListReducer } from '@/store/reducers/friend-list-reducer'
import {
	IFriendProfile,
	profileFriendReducer,
} from '@/store/reducers/profile-friend-reducer'
import { IUser, profileReducer } from '@/store/reducers/profile-reducer'
import { ISession, sessionReducer } from '@/store/reducers/session-reducer'

export interface IAppState {
	user: IUser
	session: ISession
	album: IAlbum
	friendList: IFriends
	messages: IDialogs
	profileFriend: IFriendProfile
}

const reducer = combineReducers<IAppState>({
	user: profileReducer,
	session: sessionReducer,
	album: albumReducer,
	friendList: friendListReducer,
	messages: dialogReducer,
	profileFriend: profileFriendReducer,
})

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
	}
}

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
