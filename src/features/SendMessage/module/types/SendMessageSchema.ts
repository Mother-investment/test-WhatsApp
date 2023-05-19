import { AuthData } from 'features/AuthByIdToken'
import { Status } from 'shared/types/slice'

export type IdMessage = {
	idMessage: string
}

export type DataToSend = {
	authData: AuthData
	message: string
	tel: string
}

export type SendMessageSchema = {
	status: Status
	errorMessage?: string
}