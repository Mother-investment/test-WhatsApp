import { Status } from 'shared/types/slice'


export type AuthData = {
	idInstance: string
	apiTokenInstance: string
}

export type StateInstance = {
	stateInstance: 'authorized' | 'notAuthorized' | 'blocked' | 'sleepMode' | 'starting'
}

export type LoginSchema = {
	authData?: AuthData
	status: Status
	errorMessage?: string
	_inited: boolean
}