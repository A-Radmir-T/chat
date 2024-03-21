import * as React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'

import { Avatar } from '@/components/avatar/Avatar'
import { CustomButton } from '@/components/custom-button/Custom-button'
import { IFriend } from '@/shared/interfaces/profile.interface'
import { addFriendAsync } from '@/store/actions/friend-actions/add-friend-async'
import { cancelFriendAsync } from '@/store/actions/friend-actions/cancel-friend-async'
import { deleteFriendAsync } from '@/store/actions/friend-actions/delete-friend-async'
import { IAppState } from '@/store/store'
import { AppActionTypes } from '@/store/types'

import styles from './Friend.module.scss'

type FriendProps = {
	user: IFriend
	profileId: string
}
export const Friend = ({ user, profileId }: FriendProps) => {
	const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, AppActionTypes>>()
	const [loading, setLoading] = useState(false)

	const onClickBtn = async (btn: 'cancel' | 'add' | 'delete') => {
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
				await dispatch(cancelFriendAsync(user.id))
				setLoading(false)
				return
		}
	}

	return (
		<div className={styles.user}>
			<Link to={`/${user.friendId}`} className={styles.ava}>
				<Avatar avatar={user.avatar} />
			</Link>
			<div className={styles.info}>
				<Link to={`/${user.friendId}`} className={styles.userName}>
					{user.firstName} {user.lastName}
				</Link>
				<Link to={`/messages/${user.friendId}`}>Написать сообщение</Link>
			</div>

			{!user?.isAccepted && user?.senderId === profileId && (
				<CustomButton onClick={() => onClickBtn('cancel')} loading={loading}>
					Отменить заявку
				</CustomButton>
			)}
			{user?.isAccepted && (
				<CustomButton onClick={() => onClickBtn('delete')} loading={loading}>
					Удалить из друзей
				</CustomButton>
			)}
			{user && !user?.isAccepted && user?.senderId !== profileId && (
				<CustomButton onClick={() => onClickBtn('add')} loading={loading}>
					Принять в друзья
				</CustomButton>
			)}
		</div>
	)
}
