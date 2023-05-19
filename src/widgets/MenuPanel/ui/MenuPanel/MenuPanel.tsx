import { classNames } from 'shared/lib/classNames/classNames'
import cls from './MenuPanel.module.scss'
import { HeaderMenuPanel } from '../HeaderMenuPanel/HeaderMenuPanel'
import { ChatsMenuPanel } from '../ChatsMenuPanel/ChatsMenuPanel'

type MenuPanelProps = {
	className?: string
}

export const MenuPanel = (props: MenuPanelProps) => {
	const { className } = props

	return (
		<div className={classNames(cls.MenuPanel, {}, [className])}>
			<HeaderMenuPanel />
			<ChatsMenuPanel />
		</div>
	)
}
