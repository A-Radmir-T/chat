import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'

import { ProfileFriends } from '@/pages/profile/components/profile-friends/Profile-friends'
import { UserHeader } from '@/pages/user/componets/user-header/User-header'
import { UserPictures } from '@/pages/user/componets/user-pictures/User-pictures'
import { clearProfileFriend } from '@/store/actions/profile-actions/clear-profile-friend'
import { getProfileFriendAsync } from '@/store/actions/profile-actions/get-profile-friend-async'
import { selectError } from '@/store/selectors/select-error'
import { selectProfileFriend } from '@/store/selectors/select-profile-friend'
import { IAppState } from '@/store/store'
import { AppActionTypes } from '@/store/types'

import styles from './User.module.scss'

export const User = () => {
	const { id } = useParams()
	const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, AppActionTypes>>()
	const { user, friends, album } = useSelector(selectProfileFriend)
	const error = useSelector(selectError)
	useEffect(() => {
		if (id) dispatch(getProfileFriendAsync(id))
		return () => {
			dispatch(clearProfileFriend())
		}
	}, [])

	return (
		<>
			{error ? (
				<div className={styles.error}>{error}</div>
			) : (
				<div>
					{id && (
						<UserHeader
							firstName={user.firstName}
							lastName={user.lastName}
							avatar={user.avatar}
							id={id}
						/>
					)}
					<div className={styles.profile_content}>
						<div className={styles.left}>
							<UserPictures photos={album.images} />
						</div>
						<div className={styles.right}>
							<ProfileFriends friends={friends} />
						</div>
					</div>
				</div>
			)}
		</>
	)
}
