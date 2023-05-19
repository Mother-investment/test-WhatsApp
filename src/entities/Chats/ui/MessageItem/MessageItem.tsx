import { classNames } from 'shared/lib/classNames/classNames'
import cls from './MessageItem.module.scss'
import MessageTriangleLeft from 'shared/assets/icons/messageTriangleLeft.svg'
import MessageTriangleRight from 'shared/assets/icons/messageTriangleRight.svg'
import { MessageData, MessageType } from 'entities/Chats/module/types/ChatsSchema'

type MessageItemProps = {
	className?: string
	messageData: MessageData
}

export const MessageItem = (props: MessageItemProps) => {
	const { className, messageData } = props

	const messageType: MessageType = messageData.type
	const messageDate = new Date(messageData.timestamp * 1000)

	return (
		<div className={classNames(cls.MessageItem, {}, [className, cls[messageType]])}>
			<span>{messageType === 'incoming' && <MessageTriangleLeft />}</span>
			<div className={cls.main}>
				<p className={cls.text}>{messageData.textMessage}</p>
				<span className={cls.indent}></span>
				<span className={cls.time}>{`${messageDate.getHours()}:${messageDate.getMinutes() === 0
					? '0' : messageDate.getMinutes() < 10
						? '0' + messageDate.getMinutes()
						: messageDate.getMinutes()
				}`}</span>
			</div>
			<span>{messageType === 'outgoing' && <MessageTriangleRight />}</span>
		</div>
	)
}
