import { StateSchema } from 'app/providers/StoreProvider'

export const getOpenedChat = (state: StateSchema) => state?.chats.openedChat