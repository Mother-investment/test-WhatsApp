import { LoginPage } from 'pages/LoginPage'
import { MainPage } from 'pages/MainPage'
import { NotFoundPage } from 'pages/NotFoundPage'
import { AppRoutes, getRouteLogin, getRouteMain } from 'shared/const/router'
import { AppRoutesProps } from 'shared/types/router'


export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
	[AppRoutes.MAIN]: {
		path: getRouteMain(),
		element: <MainPage />,
		authOnly: true
	},
	[AppRoutes.LOGIN]: {
		path: getRouteLogin(),
		element: <LoginPage />,
		loginPage: true
	},

	[AppRoutes.NOT_FOUND]: {
		path: '*',
		element: <NotFoundPage />
	}
}