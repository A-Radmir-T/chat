import * as React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Avatar } from '@/components/avatar/Avatar'
import { IMessage } from '@/shared/interfaces/message.interface'
import { IUser } from '@/store/reducers/profile-reducer'

import styles from './Message.module.scss'

type MessageProps = {
	id: string
	user?: IUser
	text: string
	publishedAt: string
	isRead: boolean
	redMessage: (unreadMessageId: string, friendId: string) => void
	friendId: string
	message: IMessage
	profileId: string
}
export const Message = ({
	id,
	user,
	isRead,
	publishedAt,
	text,
	redMessage,
	friendId,
	message,
	profileId,
}: MessageProps) => {
	useEffect(() => {
		if (profileId !== message.senderId && !message.isRead) {
			redMessage(id, friendId)
		}
	}, [])

	return (
		<div className={styles.message}>
			{user && (
				<Link to={`/${user.id}`} className={styles.messageAva}>
					<Avatar avatar={user?.avatar} width="50px" height="50px" />
				</Link>
			)}
			<div
				className={
					profileId === message.senderId && !message.isRead
						? `${styles.messageBody} ${styles.unRead}`
						: `${styles.messageBody}`
				}
			>
				{user && (
					<Link to={`/${user.id}`} className={styles.userName}>
						{user?.firstName} {user?.lastName}
					</Link>
				)}
				<div className={styles.text}>
					<span>{text}</span> <p className={styles.info}>{publishedAt}</p>
				</div>
			</div>
		</div>
	)
}
