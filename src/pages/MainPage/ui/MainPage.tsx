import { classNames } from 'shared/lib/classNames/classNames'
import cls from './MainPage.module.scss'
import { MenuPanel } from 'widgets/MenuPanel'
import { Messages } from 'widgets/Messages'


const MainPage = () => {

	return (
		<main className={classNames(cls.MainPage, {}, [])}>
			<MenuPanel className={cls.menuPanel} />
			<Messages className={cls.messages} />
		</main>
	)
}
export default MainPage