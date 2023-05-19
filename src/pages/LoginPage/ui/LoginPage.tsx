import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginPage.module.scss'
import WhatsappLogo from 'shared/assets/icons/whatsappLogo.svg'
import { Container } from 'shared/ui/Container/Container'
import { LoginForm } from 'features/AuthByIdToken'


const LoginPage = () => {

	return (
		<main className={classNames(cls.LoginPage, {}, [])}>
			<div className={cls.before}></div>
			<Container maxWidth='1000px' className={cls.container}>
				<header className={cls.header}>
					<span className={cls.header__logo}><WhatsappLogo /></span>
					<h3 className={cls.header__title}> WhatsApp Web</h3>
				</header>
				<section className={cls.window}>
					<div className={cls.window__container}>
						<LoginForm />
					</div>
				</section>
			</Container>
		</main>
	)
}
export default LoginPage