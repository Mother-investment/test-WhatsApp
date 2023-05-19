import cls from './ButtonLoader.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'

type ButtonLoaderProps = {
	className?: string
}

export const ButtonLoader = (props: ButtonLoaderProps) => {
	const { className } = props

	return (
		<span className={classNames(cls.ButtonLoader, {}, [className])}></span>
	)
}