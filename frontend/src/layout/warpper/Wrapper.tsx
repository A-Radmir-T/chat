import * as React from 'react'
import { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'

import { SocketContext } from '@/context/socket-context'
import { useSocket } from '@/hooks/use-socket'
import { getProfileAsync } from '@/store/actions/profile-actions/get-profile-async'
import { selectProfileId } from '@/store/selectors/select-profile-id'
import { IAppState } from '@/store/store'
import { AppActionTypes } from '@/store/types'

type WrapperProps = {
	children: ReactNode
}
export const Wrapper = ({ children }: WrapperProps) => {
	const { disconnectSocket, connectRoom, sendMessage, readMessage } = useSocket()
	const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, AppActionTypes>>()
	const navigate = useNavigate()
	const profileId = useSelector(selectProfileId)
	const { id } = useParams()
	useEffect(() => {
		if (id === profileId) {
			navigate('/')
		}
	}, [id])

	useEffect(() => {
		dispatch(getProfileAsync())

		return () => {
			disconnectSocket()
		}
	}, [])
	return (
		<SocketContext.Provider
			value={{ disconnectSocket, connectRoom, sendMessage, readMessage }}
		>
			{children}
		</SocketContext.Provider>
	)
}
