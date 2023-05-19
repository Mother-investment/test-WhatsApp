import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Messages.module.scss'
import { HeaderMessages } from '../HeaderMessages/HeaderMessages'
import { SendMessageForm } from 'features/SendMessage'
import { MessageList } from 'entities/Chats/ui/MessageList/MessageList'

type MessagesProps = {
	className?: string
}

export const Messages = (props: MessagesProps) => {
	const { className } = props

	return (
		<div className={classNames(cls.Messages, {}, [className])}>
			<HeaderMessages />
			<MessageList />
			<footer className={cls.footer}>
				<SendMessageForm />
			</footer>
		</div>
	)
}
