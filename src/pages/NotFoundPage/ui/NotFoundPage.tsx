import { classNames } from 'shared/lib/classNames/classNames'
import cls from './NotFoundPage.module.scss'

type NotFoundPageProps = {
className?: string
}

export const NotFoundPage = (props: NotFoundPageProps) => {
	const { className } = props

	return (
		<section className={classNames(cls.NotFoundPage, {}, [className])}>
			Страница не найдена
		</section>
	)
}