import * as React from 'react'
import { useSelector } from 'react-redux'

import { Pictures } from '@/pages/profile/components/pictures/Pictures'
import { ProfileFriends } from '@/pages/profile/components/profile-friends/Profile-friends'
import { selectFriends } from '@/store/selectors/select-friends'
import { selectImages } from '@/store/selectors/select-images'
import { selectUser } from '@/store/selectors/select-user'

import styles from './Profile.module.scss'
import { ProfileHeader } from './components/profile-header/Profile-header'

export const Profile = () => {
	const { lastName, firstName, avatar } = useSelector(selectUser)
	const images = useSelector(selectImages)
	const friends = useSelector(selectFriends)
	return (
		<div className={styles.profile}>
			<ProfileHeader firstName={firstName} lastName={lastName} avatar={avatar} />

			<div className={styles.profile_content}>
				<div className={styles.left}>
					<Pictures photos={images} />
				</div>
				<div className={styles.right}>
					<ProfileFriends friends={friends} />
				</div>
			</div>
		</div>
	)
}
