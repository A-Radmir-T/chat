import * as React from 'react'
import { useSelector } from 'react-redux'

import { Friend } from '@/pages/friends/components/freind/Friend'
import { IFriend } from '@/shared/interfaces/profile.interface'
import { selectProfileId } from '@/store/selectors/select-profile-id'

import styles from './Friend-list.module.scss'

type FriendProps = {
	users: IFriend[]
}
export const FriendList = ({ users }: FriendProps) => {
	const profileId = useSelector(selectProfileId)
	return (
		<div className={styles.friendList}>
			{users.length ? (
				users.map((friend) => (
					<Friend key={friend.id} user={friend} profileId={profileId} />
				))
			) : (
				<div style={{ textAlign: 'center' }}>Пусто</div>
			)}
		</div>
	)
}
