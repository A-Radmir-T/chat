import * as React from 'react'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'

import { Avatar } from '@/components/avatar/Avatar'
import { SearchInput } from '@/components/search-input/Search-input'
import { useDebounce } from '@/hooks/use-debounce'
import { MessageRoom } from '@/pages/messages/components/message-room/Message-room'
import { IDialog } from '@/shared/interfaces/message.interface'
import { clearMessages } from '@/store/actions/dialog-actions/clear-messages'
import { createDialogAsync } from '@/store/actions/dialog-actions/create-dialog-async'
import { selectDialogs } from '@/store/selectors/select-dialogs'
import { selectUser } from '@/store/selectors/select-user'
import { IAppState } from '@/store/store'
import { AppActionTypes } from '@/store/types'

import styles from './Messages.module.scss'

export const Messages = () => {
	const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, AppActionTypes>>()
	const { id } = useParams()
	const [searchValue, setSearchValue] = useState('')
	const [searchDialogs, setSearchDialogs] = useState<IDialog[]>([])
	const dialogs = useSelector(selectDialogs)
	const profile = useSelector(selectUser)
	const dialog = dialogs.find((d) => d?.user?.id === id)
	const debounced = useDebounce(searchValue)
	useEffect(() => {
		if (!dialog && id) {
			dispatch(createDialogAsync(id))
		}
		return () => {
			dispatch(clearMessages())
		}
	}, [id])

	useEffect(() => {
		const filtered = dialogs.filter(
			(dialog) =>
				dialog.user.firstName.toLowerCase().includes(debounced.toLowerCase()) ||
				dialog.user.lastName.toLowerCase().includes(debounced.toLowerCase()),
		)
		setSearchDialogs(filtered)
	}, [debounced])
	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target
		setSearchValue(value)
	}

	return (
		<>
			{dialog ? (
				<MessageRoom profile={profile} dialog={dialog} />
			) : (
				<div className={styles.messages}>
					<SearchInput onChange={onChange} value={searchValue} />
					<div className={styles.list}>
						{searchDialogs.length ? (
							searchDialogs.map((dialog) => (
								<Link
									className={styles.message}
									to={`/messages/${dialog.user.id}`}
									key={dialog.id}
								>
									<Avatar avatar={dialog.user.avatar} width="70px" height="70px" />
									<div className={styles.messageInfo}>
										<div>{dialog.user.firstName}</div>
										<div className={styles.text}>
											{dialog.message?.senderId === profile.id && (
												<Avatar avatar={profile.avatar} width="40px" height="40px" />
											)}
											{dialog.message?.text}
										</div>
									</div>
									<small>{dialog.message?.publishedAt}</small>
								</Link>
							))
						) : (
							<small>У вас пока нет сообщений</small>
						)}
					</div>
				</div>
			)}
		</>
	)
}
