import { StateSchema } from 'app/providers/StoreProvider'

export const getAuthErrorMessage = (state: StateSchema) => state?.login.errorMessage