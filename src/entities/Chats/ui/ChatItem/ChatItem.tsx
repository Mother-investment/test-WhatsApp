import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ChatItem.module.scss'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useCallback } from 'react'
import { chatsActions } from 'entities/Chats/module/slice/chatsSlice'
import { ChatData } from 'entities/Chats/module/types/ChatsSchema'
import AvatarIcon from 'shared/assets/icons/avatarIcon.svg'
import { Button } from 'shared/ui/Button/Button'

type ChatItemProps = {
	className?: string
	chatData: ChatData
}

export const ChatItem = (props: ChatItemProps) => {
	const { className, chatData } = props
	const dispatch = useAppDispatch()

	const createDateLastMessage = (timestamp: number) => {
		const date = new Date()
		const messageDate = new Date(timestamp * 1000)
		const today = {
			day: date.getDate(),
			month: date.getMonth() + 1,
			year: date.getFullYear(),
		}
		const messageDateObject = {
			minutes: messageDate.getMinutes(),
			hours: messageDate.getHours(),
			day: messageDate.getDate(),
			month: messageDate.getMonth() + 1,
			year: messageDate.getFullYear(),
		}
		const isToday = today.day === messageDateObject.day && today.month === messageDateObject.month && today.year === messageDateObject.year
		const isYesterday = today.day - 1 === messageDateObject.day && today.month === messageDateObject.month && today.year === messageDateObject.year

		if(isToday) {
			return `${messageDateObject.hours}:${messageDateObject.minutes === 0
				? '00' : messageDateObject.minutes < 10
					? '0' + messageDateObject.minutes
					: messageDateObject.minutes
			}`} else if (isYesterday) {
			return 'Вчера'
		} else {
			return `${messageDateObject.day}/${messageDateObject.month}/${messageDateObject.year}`
		}
	}

	const timestampLastMessage = chatData.messages[0]?.timestamp
	const dateLastMessage = timestampLastMessage ? createDateLastMessage(timestampLastMessage) : ''


	const openChat = useCallback(() => {
		dispatch(chatsActions.openChat(chatData))
	}, [chatData, dispatch])

	return (
		<li className={classNames(cls.ChatItem, {}, [className])}>
			<Button className={cls.btn} onClick={openChat} clear>
				<div className={cls.avatar}>
					<AvatarIcon />
				</div>
				<div className={cls.info}>
					<div className={cls.info__header}>
						<h3 className={cls.info__tel}>{chatData.tel}</h3>
						{chatData.messages.length > 0 && <span className={cls.info__time}>{dateLastMessage}</span>}
					</div>
					{chatData.messages.length > 0 && <p className={cls.info__lastMessage}>{chatData.messages[0]?.textMessage}</p>}
				</div>
			</Button>
		</li>
	)
}
