import { createSlice } from '@reduxjs/toolkit'
import { authByIdToken } from '../services/authByIdToken/authByIdToken'
import { LoginSchema } from '../types/LoginSchema'
import { ID_AND_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

const initialState: LoginSchema = {
	authData: undefined,
	status: 'init',
	errorMessage: undefined,
	_inited: false
}

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		logout: (state) => {
			state.authData = undefined
			localStorage.removeItem(ID_AND_TOKEN_LOCALSTORAGE_KEY)
		},
		initialize: (state) => {
			state._inited = true
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(authByIdToken.pending, (state) => {
				state.errorMessage = undefined
				state.status = 'loading'
			})
			.addCase(authByIdToken.fulfilled, (state, action) => {
				state.status = 'success'
				state.authData = action.payload
				state._inited = true
			})
			.addCase(authByIdToken.rejected, (state, action) => {
				state.status = 'error'
				state.errorMessage = action.payload
				state._inited = true
			})
	}
})

export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice
