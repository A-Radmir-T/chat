import * as React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'

import { Avatar } from '@/components/avatar/Avatar'
import { CustomButton } from '@/components/custom-button/Custom-button'
import { addFriendAsync } from '@/store/actions/friend-actions/add-friend-async'
import { cancelFriendAsync } from '@/store/actions/friend-actions/cancel-friend-async'
import { deleteFriendAsync } from '@/store/actions/friend-actions/delete-friend-async'
import { sendFriendRequestAsync } from '@/store/actions/friend-actions/send-friend-request-async'
import { getProfileFriendAsync } from '@/store/actions/profile-actions/get-profile-friend-async'
import { IUser } from '@/store/reducers/profile-reducer'
import { selectFriends } from '@/store/selectors/select-friends'
import { IAppState } from '@/store/store'
import { AppActionTypes } from '@/store/types'

import styles from './Search-user.module.scss'

type UserProps = {
	profileId: string
	user: IUser
}
export const SearchUser = ({ profileId, user }: UserProps) => {
	const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, AppActionTypes>>()
	const navigate = useNavigate()
	const friends = useSelector(selectFriends)
	const friend = friends.find((friend) => friend.friendId === user.id)
	const [loading, setLoading] = useState(false)
	const onClickBtn = async (btn: 'cancel' | 'add' | 'delete' | 'send') => {
		setLoading(true)
		switch (btn) {
			case 'delete':
				await dispatch(deleteFriendAsync(user.id))
				setLoading(false)
				return
			case 'add':
				await dispatch(addFriendAsync(user.id))
				setLoading(false)
				return
			case 'cancel':
				await dispatch(cancelFriendAsync(friend?.id || ''))
				setLoading(false)
				return
			case 'send':
				await dispatch(sendFriendRequestAsync(user.id))
				setLoading(false)
				return
		}
		setLoading(false)
	}

	const onClickUser = () => {
		if (user.id) {
			dispatch(getProfileFriendAsync(user.id)).then(() => {
				navigate(`/${user.id}`)
			})
		}
	}

	return (
		<div className={styles.user}>
			<div className={styles.ava} onClick={onClickUser}>
				<Avatar avatar={user.avatar} />
			</div>
			<div className={styles.info}>
				<Link to={`/${user.id}`} className={styles.userName}>
					{user.firstName} {user.lastName}
				</Link>
				<Link to={`/messages/${user.id}`}>Написать сообщение</Link>
			</div>
			{!friend && (
				<CustomButton onClick={() => onClickBtn('send')} loading={loading}>
					Добавить в друзья
				</CustomButton>
			)}
			{!friend?.isAccepted && friend?.senderId === profileId && (
				<CustomButton onClick={() => onClickBtn('cancel')} loading={loading}>
					Отменить заявку
				</CustomButton>
			)}
			{friend?.isAccepted && (
				<CustomButton onClick={() => onClickBtn('delete')} loading={loading}>
					Удалить из друзей
				</CustomButton>
			)}
			{friend && !friend?.isAccepted && friend?.senderId !== profileId && (
				<CustomButton onClick={() => onClickBtn('add')} loading={loading}>
					Принять в друзья
				</CustomButton>
			)}
		</div>
	)
}
