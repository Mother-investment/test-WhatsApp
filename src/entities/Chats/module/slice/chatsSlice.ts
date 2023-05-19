import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ChatData, ChatsSchema } from '../types/ChatsSchema'
import { fetchDataChat } from '../services/fetchDataChat/fetchDataChat'

const initialState: ChatsSchema = {
	chatsData: [],
	openedChat: undefined,
	status: 'init',
	errorMessage: undefined
}

export const chatsSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
		openChat: (state, action: PayloadAction<ChatData>) => {
			state.openedChat = action.payload.tel
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDataChat.pending, (state) => {
				state.errorMessage = undefined
				state.status = 'loading'
			})
			.addCase(fetchDataChat.fulfilled, (state, action) => {
				state.status = 'success'
				const index = state.chatsData.findIndex((data) => data.tel === action.payload.tel)
				if (index === -1) {
					state.chatsData.push(action.payload)
				}else {
					state.chatsData[index] = action.payload
				}
			})
			.addCase(fetchDataChat.rejected, (state, action) => {
				state.status = 'error'
				state.errorMessage = action.payload
			})
	}
})

export const { actions: chatsActions } = chatsSlice
export const { reducer: chatsReducer } = chatsSlice