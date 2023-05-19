import cls from './Container.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import type { ReactNode } from 'react'

type ContainerProps = {
	className?: string
	children: ReactNode
	maxWidth?: string
}

export const Container = (props: ContainerProps) => {
	const {
		className,
		children,
		maxWidth = '1600px'
	} = props

	return (
		<div className={classNames(cls.Container, {}, [className])} style={{ maxWidth }}>
			{children}
		</div>
	)
}