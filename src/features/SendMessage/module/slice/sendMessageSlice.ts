import { createSlice } from '@reduxjs/toolkit'
import { SendMessageSchema } from '../types/SendMessageSchema'
import { sendMessage } from '../services/sendMessage/sendMessage'

const initialState: SendMessageSchema = {
	status: 'init',
	errorMessage: undefined
}

export const sendMessageSlice = createSlice({
	name: 'sendMessage',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(sendMessage.pending, (state) => {
				state.errorMessage = undefined
				state.status = 'loading'
			})
			.addCase(sendMessage.fulfilled, (state) => {
				state.status = 'success'
			})
			.addCase(sendMessage.rejected, (state, action) => {
				state.status = 'error'
				state.errorMessage = action.payload
			})
	}
})

export const { actions: sendMessageActions } = sendMessageSlice
export const { reducer: sendMessageReducer } = sendMessageSlice