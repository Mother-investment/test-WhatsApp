import { createSlice } from '@reduxjs/toolkit'
import { ReceiveNotificationSchema } from '../types/ReceiveNotificationSchema'
import { receiveNotification } from '../services/receiveNotification/receiveNotification'
import { deleteNotification } from '../services/deleteNotification/deleteNotification'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { getAuthData } from 'features/AuthByIdToken'

const initialState: ReceiveNotificationSchema = {
	status: 'init',
	errorMessage: undefined
}

export const receiveNotificationSlice = createSlice({
	name: 'receiveNotification',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(receiveNotification.pending, (state) => {
				state.errorMessage = undefined
				state.status = 'loading'
			})
			.addCase(receiveNotification.fulfilled, (state) => {
				state.status = 'success'
			})
			.addCase(receiveNotification.rejected, (state, action) => {
				state.status = 'error'
				state.errorMessage = action.payload
			})
			.addCase(deleteNotification.pending, (state) => {
				state.errorMessage = undefined
				state.status = 'loading'
			})
			.addCase(deleteNotification.fulfilled, (state) => {
				state.status = 'success'
			})
			.addCase(deleteNotification.rejected, (state, action) => {
				state.status = 'error'
				state.errorMessage = action.payload
			})
	}
})

export const { actions: receiveNotificationActions } = receiveNotificationSlice
export const { reducer: receiveNotificationReducer } = receiveNotificationSlice