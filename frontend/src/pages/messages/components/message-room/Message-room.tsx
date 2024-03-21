import * as React from 'react'
import { useContext, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'

import { Avatar } from '@/components/avatar/Avatar'
import { SocketContext } from '@/context/socket-context'
import { FormMessage } from '@/pages/messages/components/form-message/Form-message'
import { Message } from '@/pages/messages/components/message/Message'
import { IDialog } from '@/shared/interfaces/message.interface'
import { deleteDialogAsync } from '@/store/actions/dialog-actions/delete-dialog-async'
import { getMessagesAsync } from '@/store/actions/dialog-actions/get-messages-async'
import { IUser } from '@/store/reducers/profile-reducer'
import { selectMessages } from '@/store/selectors/select-messages'
import { IAppState } from '@/store/store'
import { AppActionTypes } from '@/store/types'

import styles from './Message-room.module.scss'

type MessageRoomProps = {
	profile: IUser
	dialog: IDialog
}

export const MessageRoom = ({ dialog, profile }: MessageRoomProps) => {
	const { connectRoom, sendMessage, readMessage } = useContext(SocketContext)
	const ref = useRef<null | HTMLDivElement>(null)
	const nav = useNavigate()
	const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, AppActionTypes>>()
	const messages = useSelector(selectMessages)
	useEffect(() => {
		if (dialog) {
			dispatch(getMessagesAsync(dialog.id))
			connectRoom(dialog.id)
		}
	}, [])

	const onPrevPage = () => {
		if (messages.length) {
			nav('/messages')
			return
		}
		dispatch(deleteDialogAsync(dialog.id)).then(() => {
			nav('/messages')
		})
	}
	useEffect(() => {
		ref.current?.scrollTo(0, ref.current?.scrollHeight)
	}, [ref.current?.scrollHeight, messages])
	return (
		<div className={styles.messageRoom}>
			<div className={styles.roomHeader}>
				<div className={styles.prev} onClick={onPrevPage}>
					{'<'}
				</div>
				<div>
					{dialog.user.firstName} {dialog.user.lastName}
				</div>
				<Link to={`/${dialog.user.id}`}>
					<Avatar avatar={dialog.user.avatar} width="60px" height="60px" />
				</Link>
			</div>
			<div className={styles.messages} ref={ref}>
				{messages &&
					messages.map((message, idx) => {
						if (messages[idx - 1] && message.senderId === messages[idx - 1].senderId) {
							return (
								<Message
									id={message.id}
									key={message.id || idx}
									text={message.text}
									isRead={profile.id === message.senderId ? true : message.isRead}
									publishedAt={message.publishedAt}
									redMessage={readMessage}
									friendId={dialog.user.id}
									message={message}
									profileId={profile.id}
								/>
							)
						}
						return (
							<Message
								id={message.id}
								key={message.id || idx}
								user={message.senderId === profile.id ? profile : dialog.user}
								text={message.text}
								isRead={profile.id === message.senderId ? true : message.isRead}
								publishedAt={message.publishedAt}
								redMessage={readMessage}
								friendId={dialog.user.id}
								message={message}
								profileId={profile.id}
							/>
						)
					})}
			</div>
			<FormMessage
				dialogId={dialog.id}
				friendId={dialog.user.id}
				sendMessage={sendMessage}
			/>
		</div>
	)
}
