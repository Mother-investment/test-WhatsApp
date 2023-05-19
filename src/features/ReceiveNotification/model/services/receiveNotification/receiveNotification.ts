import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { AnswerReceiveNotification, IdMessage } from '../../types/ReceiveNotificationSchema'
import { AuthData } from 'features/AuthByIdToken'
import { deleteNotification } from '../deleteNotification/deleteNotification'
import { fetchDataChat } from 'entities/Chats'


export const receiveNotification = createAsyncThunk<AnswerReceiveNotification, AuthData, ThunkConfig<string>>(
	'receiveNotification/receiveNotification',
	async (authData, thunkAPI) => {
		const { rejectWithValue, extra, dispatch } = thunkAPI

		try {
			const response = await extra.api.get<AnswerReceiveNotification>(
				`/waInstance${authData.idInstance}/ReceiveNotification/${authData.apiTokenInstance}`
			)

			if (!response.data) {
				throw new Error('Что-то пошло не так :(')
			}

			dispatch(deleteNotification({ authData, receiptId: response.data.receiptId }))
			dispatch(fetchDataChat({ authData, tel: response.data.body.senderData.chatId.slice(0, response.data.body.senderData.chatId.length - 5) }))

			return response.data
		} catch (error) {
			return rejectWithValue('Ошибка при получении уведомления')
		}
	}
)