import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { AuthData } from 'features/AuthByIdToken'
import { receiveNotification } from '../receiveNotification/receiveNotification'


export const receiveNotificationPoling = createAsyncThunk<void, AuthData, ThunkConfig<string>>(
	'receiveNotification/receiveNotification',
	async (authData, thunkAPI) => {
		setInterval(() => {
			const { dispatch } = thunkAPI
			dispatch(receiveNotification(authData))
		}, 4000)
	}
)