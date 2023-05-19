import { classNames } from 'shared/lib/classNames/classNames'
import cls from './HeaderMessages.module.scss'

type HeaderMessagesProps = {
	className?: string
}

export const HeaderMessages = (props: HeaderMessagesProps) => {
	const { className } = props

	return (
		<div className={classNames(cls.HeaderMessages, {}, [className])}>

		</div>
	)
}
