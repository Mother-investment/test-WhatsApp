import cls from './LoginForm.module.scss'
import { memo, useCallback, useState } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { classNames } from 'shared/lib/classNames/classNames'
import { Input } from 'shared/ui/Input/Input'
import { Button } from 'shared/ui/Button/Button'
import { useSelector } from 'react-redux'
import { getAuthStatus } from './../../model/selectors/getAuthStatus/getAuthStatus'
import { getAuthErrorMessage } from './../../model/selectors/getAuthErrorMessage/getAuthErrorMessage'
import { authByIdToken } from './../../model/services/authByIdToken/authByIdToken'
import { Link } from 'react-router-dom'

type LoginFormProps = {
	className?: string
}

export const LoginForm = memo((props: LoginFormProps) => {
	const { className } = props
	const dispatch = useAppDispatch()

	const authStatus = useSelector(getAuthStatus)
	const errorMessage = useSelector(getAuthErrorMessage)

	const [idInstance, setIdInstance] = useState('')
	const [apiTokenInstance, setApiTokenInstance] = useState('')
	const [errorInput, setErrorInput] = useState(false)

	const onClearErrorInput = useCallback(() => {
		setErrorInput(false)
	},[])

	const onLoginClick = useCallback(() => {
		if(idInstance && apiTokenInstance) {
			dispatch(authByIdToken({ idInstance, apiTokenInstance }))
		}else {
			setErrorInput(true)
		}
	}, [apiTokenInstance, dispatch, idInstance])

	return (
		<form className={classNames(cls.LoginForm, {}, [className])}>
			<h1 className={cls.title}>Используйте WhatsApp на компьютере</h1>

			<Input
				className={cls.input}
				placeholder='Введите idInstance'
				value={idInstance}
				onChange={setIdInstance}
				onClick={onClearErrorInput}
				error={errorInput}
			/>
			<Input
				className={cls.input}
				placeholder='Введите apiTokenInstance'
				value={apiTokenInstance}
				onChange={setApiTokenInstance}
				onClick={onClearErrorInput}
				error={errorInput}
			/>
			<Button
				className={cls.button}
				type='button'
				loading={authStatus === 'loading'}
				onClick={onLoginClick}
			>Войти</Button>

			<p className={classNames(cls.errorMessage, { [cls.errorTrue]: errorMessage }, [])}>
				{errorMessage || 'Тут могла быть ваша ошибка'}
			</p>

			<h3>
				Чтобы получить idInstance и apiTokenInstance воспользуйтесь
				<Link
					className={cls.link}
					target='_blank'
					to='https://green-api.com/docs/before-start/#parameters'
				> инструкцией.</Link>
			</h3>
		</form>
	)
})
