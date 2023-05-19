import { classNames, Mods } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'
import type { ButtonHTMLAttributes } from 'react'
import { ButtonLoader } from '../Loaders'

type ActivTheme = 'primary' | 'green'

type ButtonProps = {
	className?: string
	clear?: boolean
	icon?: boolean
	disabled?: boolean
	loading?: boolean
	active?: boolean
	activTheme?: ActivTheme
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: ButtonProps) => {
	const {
		className,
		children,
		clear,
		icon,
		disabled,
		loading,
		active,
		activTheme = 'primary',
		...otherProps
	} = props

	const mods: Mods = {
		[cls.disabled]: disabled,
		[cls.loading]: loading,
		[cls.active]: active
	}

	if(icon) {
		return (
			<button
				className={classNames(cls.Button, mods, [className, cls.clear])}
				disabled={disabled}
				{...otherProps}
			>
				<div className={classNames(cls.btnContainer, {}, [cls[activTheme]])}>
					{children}
				</div>
			</button>
		)
	}

	if(clear) {
		return (
			<button
				className={classNames(cls.Button, mods, [className, cls.clear])}
				disabled={disabled}
				{...otherProps}
			>
				{children}
			</button>
		)
	}

	return (
		<button
			className={classNames(cls.Button, mods, [className])}
			disabled={disabled}
			{...otherProps}
		>
			{children}
			<ButtonLoader className={cls.buttonLoader}/>
		</button>
	)
}