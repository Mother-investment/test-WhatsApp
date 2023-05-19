import { configureStore } from '@reduxjs/toolkit'
import { $api } from 'shared/api/api'
import { loginReducer } from 'features/AuthByIdToken'
import type { ReducersMapObject } from '@reduxjs/toolkit'
import type { StateSchema, ThunkExtraArg } from './StateSchema'
import { chatsReducer } from 'entities/Chats'
import { sendMessageReducer } from 'features/SendMessage'

export function createReduxStore(
	initialState?: StateSchema
) {
	const rootReducers: ReducersMapObject<StateSchema> = {
		login: loginReducer,
		chats: chatsReducer,
		sendMessage: sendMessageReducer
	}

	const extraArg: ThunkExtraArg = {
		api: $api
	}

	const store = configureStore({
		reducer: rootReducers,
		devTools: __IS_DEV__,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({
			thunk: {
				extraArgument: extraArg
			}
		})
	})

	return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']