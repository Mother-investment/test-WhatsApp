import { AuthData } from 'features/AuthByIdToken'
import { Status } from 'shared/types/slice'

export type MessageType = 'outgoing' | 'incoming'
export type StatusMessage = 'pending' | 'sent' | 'delivered' | 'read'

export type MessageData = {
	type: MessageType
	timestamp: number
	idMessage: string
	statusMessage: StatusMessage
	typeMessage: string
	chatId: string
	senderId: string
	senderName: string
	textMessage: string
	downloadUrl: string
	caption: string
	location: object
	contact: object
	extendedTextMessage: object
}

export type ChatData = {
	tel: string
	messages: MessageData[]
}

export type DataToSend = {
	authData: AuthData
	tel: string
	count?: number
}

export type ChatsSchema = {
	chatsData: ChatData[]
	openedChat?: string
	status: Status
	errorMessage?: string
}