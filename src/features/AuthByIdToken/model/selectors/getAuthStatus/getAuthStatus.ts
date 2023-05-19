import { StateSchema } from 'app/providers/StoreProvider'

export const getAuthStatus = (state: StateSchema) => state?.login.status