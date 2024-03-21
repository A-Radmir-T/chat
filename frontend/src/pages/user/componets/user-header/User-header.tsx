import * as React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'

import { Avatar } from '@/components/avatar/Avatar'
import { CustomButton } from '@/components/custom-button/Custom-button'
import { IAvatar } from '@/shared/interfaces/image.interface'
import { addFriendAsync } from '@/store/actions/friend-actions/add-friend-async'
import { cancelFriendAsync } from '@/store/actions/friend-actions/cancel-friend-async'
import { deleteFriendAsync } from '@/store/actions/friend-actions/delete-friend-async'
import { sendFriendRequestAsync } from '@/store/actions/friend-actions/send-friend-request-async'
import { showPhoto } from '@/store/actions/session-actions/show-photo'
import { selectCurrentStatus } from '@/store/selectors/select-current-status'
import { IAppState } from '@/store/store'
import { AppActionTypes } from '@/store/types'

import styles from './User-header.module.scss'

type ProfileHeaderProps = {
	lastName: string
	firstName: string
	avatar: IAvatar
	id: string
}
export const UserHeader = ({ lastName, firstName, avatar, id }: ProfileHeaderProps) => {
	const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, AppActionTypes>>()
	const status = useSelector(selectCurrentStatus)
	const [loading, setLoading] = useState(false)
	const onOpenPhoto = () => {
		if (avatar) dispatch(showPhoto(avatar.imageId))
	}

	const onFriendRequest = () => {
		setLoading(true)
		dispatch(sendFriendRequestAsync(id)).then(() => setLoading(false))
	}

	const onAddFriend = () => {
		setLoading(true)
		if (status) dispatch(addFriendAsync(status.id)).then(() => setLoading(false))
	}

	const onDeleteFriend = () => {
		setLoading(true)
		if (status) dispatch(deleteFriendAsync(status.id)).then(() => setLoading(false))
	}
	const onCancelFriendRequest = () => {
		setLoading(true)
		if (status) dispatch(cancelFriendAsync(status.id)).then(() => setLoading(false))
	}
	return (
		<>
			<div className="ownerPageCover"></div>
			<div className="profileHeader">
				<div className="profileHeaderPhoto">
					<div className="profileHeaderAva" onClick={onOpenPhoto}>
						<Avatar avatar={avatar} />
					</div>
				</div>
				<div className={styles.wrapper}>
					<div className={styles.info}>
						<h2>
							{firstName} {lastName}
						</h2>
					</div>
					<div className={styles.actions}>
						<Link to={`/messages/${id}`}>
							<CustomButton>Сообщение</CustomButton>
						</Link>
						{!status?.senderId && (
							<CustomButton onClick={onFriendRequest} loading={loading}>
								Добавить в друзья
							</CustomButton>
						)}
						{status?.senderId && !status?.isAccepted && status?.senderId !== id && (
							<CustomButton onClick={onCancelFriendRequest} loading={loading}>
								Отменить заявку
							</CustomButton>
						)}
						{status?.isAccepted && (
							<CustomButton onClick={onDeleteFriend} loading={loading}>
								Удалить из друзей
							</CustomButton>
						)}
						{!status?.isAccepted && status?.senderId === id && (
							<CustomButton onClick={onAddFriend} loading={loading}>
								Принять в друзья
							</CustomButton>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
