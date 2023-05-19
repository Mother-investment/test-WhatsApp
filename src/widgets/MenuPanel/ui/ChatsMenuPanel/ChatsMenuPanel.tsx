import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ChatsMenuPanel.module.scss'
import { ChatList } from 'entities/Chats/ui/ChatList/ChatList'
import { SearchMenuPanel } from '../SearchMenuPanel/SearchMenuPanel'

type ChatsMenuPanelProps = {
	className?: string
}

export const ChatsMenuPanel = (props: ChatsMenuPanelProps) => {
	const { className } = props

	return (
		<div className={classNames(cls.ChatsMenuPanel, {}, [className])}>
			<SearchMenuPanel />
			<ChatList />
		</div>
	)
}
