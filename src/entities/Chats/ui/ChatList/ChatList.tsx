import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ChatList.module.scss'
import { getChatsData } from './../../module/selectors/getChatsData/getChatsData'
import { useSelector } from 'react-redux'
import { ChatItem } from '../ChatItem/ChatItem'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useEffect } from 'react'
import { receiveNotificationPoling } from 'features/ReceiveNotification'
import { getAuthData } from 'features/AuthByIdToken'

type ChatListProps = {
	className?: string
}

export const ChatList = (props: ChatListProps) => {
	const { className } = props
	const dispatch = useAppDispatch()

	const chatsData = useSelector(getChatsData)
	const authData = useSelector(getAuthData)

	useEffect(() => {
		if(authData) {
			dispatch(receiveNotificationPoling(authData))
		}
	}, [authData, dispatch])

	if(chatsData && chatsData.length > 0) {
		return (
			<ul className={classNames(cls.ChatList, {}, [className])}>
				{chatsData?.map(chatData => <ChatItem key={chatData.tel} chatData={chatData} />)}
			</ul>
		)
	} else {
		return <></>
	}
}
