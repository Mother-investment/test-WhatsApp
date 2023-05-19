import { AxiosInstance } from 'axios'
import { ChatsSchema } from 'entities/Chats'
import type { LoginSchema } from 'features/AuthByIdToken'
import { SendMessageSchema } from 'features/SendMessage'


export type StateSchema = {
	login: LoginSchema
	chats: ChatsSchema
	sendMessage: SendMessageSchema
}

export type ThunkExtraArg = {
	api: AxiosInstance
}

export type ThunkConfig<T> = {
	rejectValue: T
	extra: ThunkExtraArg
	state: StateSchema
}