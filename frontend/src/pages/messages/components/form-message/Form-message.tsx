import moment from 'moment'
import 'moment/locale/ru'
import * as React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { ISendMessage } from '@/shared/interfaces/message.interface'

import styles from './Form-message.module.scss'

moment.locale('ru')

type FormMessageProps = {
	dialogId: string
	friendId: string
	sendMessage: (friendId: string, message: ISendMessage) => void
}

export const FormMessage = ({ dialogId, friendId, sendMessage }: FormMessageProps) => {
	const { register, reset, handleSubmit, setFocus } = useForm()
	const onSubmit = ({ text }: any) => {
		const newMessage: ISendMessage = {
			dialogId,
			text,
			publishedAt: moment().format('lll'),
		}
		sendMessage(friendId, newMessage)
		reset()
	}

	useEffect(() => {
		setFocus('text')
	}, [])

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<input
				type="text"
				autoComplete="off"
				{...register('text', { required: 'Пусто' })}
			/>
			<button>⮚</button>
		</form>
	)
}
