import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { AnswerDeleteNotification, TitleDeleteNotification } from '../../types/ReceiveNotificationSchema'


export const deleteNotification = createAsyncThunk<AnswerDeleteNotification, TitleDeleteNotification, ThunkConfig<string>>(
	'receiveNotification/deleteNotification',
	async (title, thunkAPI) => {
		const { rejectWithValue, extra } = thunkAPI
		const { authData, receiptId } = title

		try {
			const response = await extra.api.delete<AnswerDeleteNotification>(
				`/waInstance${authData.idInstance}/DeleteNotification/${authData.apiTokenInstance}/${receiptId}`
			)

			if (!response.data) {
				throw new Error('Что-то пошло не так :(')
			}

			return response.data
		} catch (error) {
			return rejectWithValue('Ошибка при удалении уведомления')
		}
	}
)