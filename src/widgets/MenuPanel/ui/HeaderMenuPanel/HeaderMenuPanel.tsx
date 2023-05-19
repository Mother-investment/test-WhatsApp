import { classNames } from 'shared/lib/classNames/classNames'
import cls from './HeaderMenuPanel.module.scss'
import SettingsIcon from 'shared/assets/icons/settingsIcon.svg'
import { Button } from 'shared/ui/Button/Button'
import { Dropdown } from 'shared/ui/Dropdown/Dropdown'
import { useCallback, useState } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { loginActions } from 'features/AuthByIdToken/model/slice/loginSlice'

type HeaderMenuPanelProps = {
	className?: string
}

export const HeaderMenuPanel = (props: HeaderMenuPanelProps) => {
	const { className } = props
	const dispatch = useAppDispatch()

	const [isOpenDropdown, setIsOpeningDropdown] = useState(false)

	const openDropdown = useCallback(() => {
		setIsOpeningDropdown(true)
	},[])
	const closeDropdown = useCallback(() => {
		setIsOpeningDropdown(false)
	},[])

	const logOut = useCallback(() => {
		dispatch(loginActions.logout())
	},[dispatch])

	return (
		<div className={classNames(cls.HeaderMenuPanel, {}, [className])}>
			<div className={cls.avatar}></div>
			<nav className={cls.menuBar}>
				<div className={cls.menuBar__item}>
					<Button className={cls.menuBar__btn} onClick={openDropdown} active={isOpenDropdown} icon><SettingsIcon /></Button>
					{isOpenDropdown &&
						<Dropdown className={cls.settings} isOpen={isOpenDropdown} onClose={closeDropdown}>
							<ul className={cls.settings__list}>
								<li className={cls.settings__item}>
									<Button className={cls.settings__btn} clear onClick={logOut}>Выйти</Button>
								</li>
							</ul>
						</Dropdown>
					}
				</div>
			</nav>
		</div>
	)
}
