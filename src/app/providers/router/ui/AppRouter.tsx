import { memo, Suspense, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppRoutesProps } from 'shared/types/router'
import { Loader } from 'shared/ui/Loader/Loader'
import { routeConfig } from '../config/routeConfig'
import { RequireAuth } from './RequireAuth'
import { RedirectFromLoginPage } from './RedirectFromLoginPage'

const AppRouter = () => {
	const renderWithWrapper = useCallback((route: AppRoutesProps) => {
		const element = (
			<Suspense fallback={<Loader />}>
				{route.element}
			</Suspense>
		)

		return (
			<Route
				key={route.path}
				path={route.path}
				element={
					route.authOnly ? <RequireAuth>{element}</RequireAuth>
						: route.loginPage ? <RedirectFromLoginPage>{element}</RedirectFromLoginPage>
							: element
				}
			/>
		)
	},[])

	return (
		<Routes>
			{Object.values(routeConfig).map(renderWithWrapper)}
		</Routes>
	)
}

export default memo(AppRouter)