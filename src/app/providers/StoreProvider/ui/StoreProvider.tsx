import { Provider } from 'react-redux'
import { createReduxStore } from '../config/store'
import type { StateSchema } from '../config/StateSchema'
import type { ReactNode } from 'react'

type StoreProviderProps = {
	children?: ReactNode
	initialState?: DeepPartial<StateSchema>
}

export const StoreProvider = (props: StoreProviderProps) => {
	const { children, initialState } = props

	const store = createReduxStore(
		initialState as StateSchema
	)

	return (
		<Provider store={store}>
			{children}
		</Provider>
	)
}