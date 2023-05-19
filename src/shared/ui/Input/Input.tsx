import { memo } from 'react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import cls from './Input.module.scss'
import type { InputHTMLAttributes } from 'react'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly' | 'placeholder'>

type theme = 'secondary' | 'primary'

type InputProps = {
	className?: string
	theme?: theme
	value?: string
	onChange?: (value: string) => void
	onClick?: () => void
	readOnly?: boolean
	placeholder?: string
	error?: boolean
	tel?: boolean
} & HTMLInputProps

export const Input = memo((props: InputProps) => {
	const { className, theme = 'primary',value, onChange, onClick, readOnly, placeholder, error, tel, ...otherProps } = props

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if(tel) {
			onChange?.(e.target.value.slice(0, 11))
		} else {
			onChange?.(e.target.value)
		}
	}

	const mods: Mods = {
		[cls.readOnly]: readOnly,
		[cls.error]: error
	}

	return (
		<input
			type={tel ? 'number' : 'text'}
			className={classNames(cls.Input, mods, [className, cls[theme]])}
			value={value}
			onChange={onChangeHandler}
			onClick={onClick}
			readOnly={readOnly}
			placeholder={placeholder}
			{...otherProps}
		/>
	)
})