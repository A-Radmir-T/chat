import * as React from 'react'
import { Link } from 'react-router-dom'

import { Avatar } from '@/components/avatar/Avatar'
import { IFriend } from '@/shared/interfaces/profile.interface'

import styles from './Profile-friends.module.scss'

type ProfileFriendsProps = {
	friends: IFriend[]
}
export const ProfileFriends = ({ friends }: ProfileFriendsProps) => {
	friends = friends.filter((friend) => friend.isAccepted)
	if (friends.length > 4) friends = friends.slice(0, 4)
	return (
		<div className={styles.friends}>
			<div className={styles.header}>
				<span className="icon-users"></span>Друзья
			</div>
			<div className={styles.friendList}>
				{friends.length ? (
					friends.map((friend) => (
						<Link to={`/${friend.friendId}`} key={friend.id} className={styles.friend}>
							<Avatar avatar={friend.avatar} width="70px" height="70px" />
							<p>{friend.firstName}</p>
						</Link>
					))
				) : (
					<small>Друзей пока нет</small>
				)}
			</div>
		</div>
	)
}
