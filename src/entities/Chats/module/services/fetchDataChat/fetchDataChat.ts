import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import type { ChatData, DataToSend, MessageData } from '../../types/ChatsSchema'


export const fetchDataChat = createAsyncThunk<ChatData, DataToSend, ThunkConfig<string>>(
	'chats/fetchDataChat',
	async (dataToSend, thunkAPI) => {
		const { rejectWithValue, extra } = thunkAPI
		const { authData, tel, count } = dataToSend

		try {
			const response = await extra.api.post<MessageData[]>(
				`/waInstance${authData.idInstance}/GetChatHistory/${authData.apiTokenInstance}`,
				{ chatId: `${tel}@c.us`, count }
			)

			if (!response.data) {
				throw new Error('Что-то пошло не так :(')
			}
			return {
				tel: tel,
				messages: response.data
			}
		} catch (error) {
			return rejectWithValue('Ошибка при поиске чата')
		}
	}
)