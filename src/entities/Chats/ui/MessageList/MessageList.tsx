import { classNames } from 'shared/lib/classNames/classNames'
import cls from './MessageList.module.scss'
import { useSelector } from 'react-redux'
import { MessageItem } from '../MessageItem/MessageItem'
import { getOpenedChat } from 'entities/Chats/module/selectors/getOpenedChat/getOpenedChat'
import { getChatsData } from 'entities/Chats/module/selectors/getChatsData/getChatsData'

type MessageListProps = {
	className?: string
}

export const MessageList = (props: MessageListProps) => {
	const { className } = props

	const openedChatTel = useSelector(getOpenedChat)
	const openedChatData = useSelector(getChatsData).find(chat => chat.tel === openedChatTel)

	if(openedChatData && openedChatData.messages.length > 0) {
		return (
			<ul className={classNames(cls.MessageList, {}, [className])}>
				{openedChatData?.messages.map((message) => <MessageItem key={message.timestamp} messageData={message} />)}
			</ul>
		)
	} else {
		return <></>
	}
}
