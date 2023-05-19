import { classNames } from 'shared/lib/classNames/classNames'
import cls from './SearchMenuPanel.module.scss'
import FilterIcon from 'shared/assets/icons/filterIcon.svg'
import SearchIcon from 'shared/assets/icons/searchIcon.svg'
import { Input } from 'shared/ui/Input/Input'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { getAuthData } from 'features/AuthByIdToken'
import { fetchDataChat } from 'entities/Chats'
import { Button } from 'shared/ui/Button/Button'
import { useCallback, useState } from 'react'

type SearchMenuPanelProps = {
	className?: string
}

export const SearchMenuPanel = (props: SearchMenuPanelProps) => {
	const { className } = props
	const dispatch = useAppDispatch()

	const [tel, setTel] = useState('')

	const authData = useSelector(getAuthData)

	const getDataChat = useCallback(() => {
		if(tel.length === 11 && authData) {
			dispatch(fetchDataChat({ authData, tel }))
			setTel('')
		}
	}, [authData, dispatch, tel])

	return (
		<div className={classNames(cls.SearchMenuPanel, {}, [className])}>
			<Input className={cls.input} tel value={tel} onChange={setTel} theme='secondary' placeholder='Найти или начать новый чат' />
			{tel.length === 11
				? <Button className={cls.btn} icon onClick={getDataChat}>
					<SearchIcon />
				</Button>
				: <Button className={cls.btn} icon>
					<FilterIcon className={cls.filterIcon}/>
				</Button>
			}

		</div>
	)
}
