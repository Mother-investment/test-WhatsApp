import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { DataToSend, IdMessage } from '../../types/SendMessageSchema'


export const sendMessage = createAsyncThunk<IdMessage, DataToSend, ThunkConfig<string>>(
	'sendMessage/sendMessage',
	async (dataToSend, thunkAPI) => {
		const { rejectWithValue, extra } = thunkAPI
		const { authData, tel, message } = dataToSend

		try {
			const response = await extra.api.post<IdMessage>(
				`/waInstance${authData.idInstance}/SendMessage/${authData.apiTokenInstance}`,
				{ chatId: `${tel}@c.us`, message }
			)

			if (!response.data) {
				throw new Error('Что-то пошло не так :(')
			}

			return response.data
		} catch (error) {
			return rejectWithValue('Ошибка при отправке сообщения')
		}
	}
)