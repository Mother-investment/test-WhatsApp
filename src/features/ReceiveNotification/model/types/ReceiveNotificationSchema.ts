import { AuthData } from 'features/AuthByIdToken'
import { Status } from 'shared/types/slice'

export type IdMessage = {
	idMessage: string
}

export type AnswerReceiveNotification = {
	receiptId: number
	body: {
		senderData: {
			chatId: string
		}
	}
}

export type AnswerDeleteNotification = {
	result: boolean
}

export type TitleDeleteNotification = {
	authData: AuthData
	receiptId: number
}

export type ReceiveNotificationSchema = {
	status: Status
	errorMessage?: string
}