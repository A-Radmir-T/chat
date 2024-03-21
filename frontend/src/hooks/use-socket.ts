import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { io } from 'socket.io-client'

import { ISendMessage } from '@/shared/interfaces/message.interface'
import { receiveMessages } from '@/store/actions/dialog-actions/receive-messages'
import { updateDialog } from '@/store/actions/dialog-actions/update-dialog'
import { updateMessage } from '@/store/actions/dialog-actions/update-message'
import { selectProfileId } from '@/store/selectors/select-profile-id'
import { IAppState } from '@/store/store'
import { AppActionTypes } from '@/store/types'

export const useSocket = () => {
	const userId = useSelector(selectProfileId)
	const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, AppActionTypes>>()
	const { current: socket } = useRef(
		io(`ws://${window.location.host}`, {
			transports: ['websocket'],
			query: {
				userId,
			},
		}),
	)

	useEffect(() => {
		socket.on('connect_error', (err) => {
			console.log('connect_error', err.message)
		})
		socket.on('message:receive', (message) => {
			dispatch(receiveMessages(message))
		})
		socket.on('dialog:update', (dialog) => {
			dispatch(updateDialog(dialog))
		})
		socket.on('message:update', ({ messageId }) => {
			dispatch(updateMessage(messageId))
		})
	}, [])

	const disconnectSocket = () => {
		socket.disconnect()
	}
	const connectRoom = (roomId: string) => {
		socket.emit('room:connect', roomId)
	}
	const sendMessage = (friendId: string, message: ISendMessage): void => {
		socket.emit('message:send', { friendId, message })
	}
	const readMessage = (unreadMessageId: string, friendId: string): void => {
		socket.emit('message:read', { unreadMessageId, friendId })
		dispatch(updateMessage(unreadMessageId))
	}

	return {
		disconnectSocket,
		connectRoom,
		sendMessage,
		readMessage,
	}
}
