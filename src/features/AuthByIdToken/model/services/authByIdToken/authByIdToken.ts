import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { ID_AND_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage'
import { AuthData, StateInstance } from '../../types/LoginSchema'


export const authByIdToken = createAsyncThunk<AuthData, AuthData, ThunkConfig<string>>(
	'login/authByIdToken',
	async (authData, thunkAPI) => {
		const { rejectWithValue, extra } = thunkAPI
		const { idInstance, apiTokenInstance } = authData

		try {
			const response = await extra.api.get<StateInstance>(`/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`)

			if (!response.data) {
				throw new Error('Что-то пошло не так :(')
			}

			if(response.data.stateInstance === 'authorized') {
				localStorage.setItem(
					ID_AND_TOKEN_LOCALSTORAGE_KEY,
					JSON.stringify(authData)
				)
			}

			if(response.data.stateInstance === 'notAuthorized') {
				return rejectWithValue('Аккаунт не авторизован')
			}
			if(response.data.stateInstance === 'blocked') {
				return rejectWithValue('Аккаунт забанен')
			}
			if(response.data.stateInstance === 'sleepMode') {
				return rejectWithValue('Аккаунт ушел в спящий режим')
			}
			if(response.data.stateInstance === 'starting') {
				return rejectWithValue('Аккаунт в процессе запуска')
			}

			return authData
		} catch (error) {
			return rejectWithValue('Неправильно указан idInstance и/или apiTokenInstance')
		}
	}
)