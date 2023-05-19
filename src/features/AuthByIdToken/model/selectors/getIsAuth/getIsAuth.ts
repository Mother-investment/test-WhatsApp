import { StateSchema } from 'app/providers/StoreProvider'

export const getIsAuth = (state: StateSchema) => state?.login.authData != undefined