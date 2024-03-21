import { createContext } from 'react'

import { ISendMessage } from '@/shared/interfaces/message.interface'

interface ISocketContext {
	disconnectSocket: () => void
	connectRoom: (roomId: string) => void
	readMessage: (unreadMessageId: string, friendId: string) => void
	sendMessage: (friendId: string, message: ISendMessage) => void
}
export const SocketContext = createContext<ISocketContext>({
	disconnectSocket: () => {},
	connectRoom: () => {},
	sendMessage: () => {},
	readMessage: () => {},
})
