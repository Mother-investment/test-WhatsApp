import { classNames } from 'shared/lib/classNames/classNames'
import cls from './SendMessageForm.module.scss'
import EmojisIcon from 'shared/assets/icons/emojisIcon.svg'
import AttachIcon from 'shared/assets/icons/attachIcon.svg'
import SendMessageIcon from 'shared/assets/icons/sendMessageIcon.svg'
import { Input } from 'shared/ui/Input/Input'
import { Button } from 'shared/ui/Button/Button'
import { useCallback, useState } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { getAuthData } from 'features/AuthByIdToken'
import { sendMessage } from '../module/services/sendMessage/sendMessage'
import { fetchDataChat, getOpenedChat } from 'entities/Chats'

type SendMessageFormProps = {
	className?: string
}

export const SendMessageForm = (props: SendMessageFormProps) => {
	const { className } = props
	const dispatch = useAppDispatch()

	const authData = useSelector(getAuthData)
	const openedChatTel = useSelector(getOpenedChat)

	const [messageValue, setMessageValue] = useState('')

	const clickSendMessage = useCallback(async () => {
		if(authData && messageValue && openedChatTel) {
			const response = await dispatch(sendMessage({ authData, message: messageValue, tel: openedChatTel }))
			setMessageValue('')
			if(typeof response.payload === 'object' && response.payload.idMessage.length > 0) {
				setTimeout(() =>{
					dispatch(fetchDataChat({ authData, tel: openedChatTel }))
				}, 700)
			}
		}
	},[authData, dispatch, messageValue, openedChatTel])

	return (
		<div className={classNames(cls.SendMessageForm, {}, [className])}>
			<Button className={cls.btn} icon><EmojisIcon className={cls.icon} /></Button>
			<Button className={cls.btn} icon><AttachIcon className={cls.icon} /></Button>
			<Input className={cls.input} value={messageValue} onChange={setMessageValue}/>
			<Button className={cls.btn} onClick={clickSendMessage} icon><SendMessageIcon className={cls.icon} /></Button>
		</div>
	)
}
