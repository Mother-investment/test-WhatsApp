import { getIsAuth } from 'features/AuthByIdToken'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { getRouteMain } from 'shared/const/router'

export function RedirectFromLoginPage({ children }: { children: JSX.Element }) {
	const auth = useSelector(getIsAuth)
	const location = useLocation()// TODO чекнуть location - думаю что сохраняет путь после редиректа на логин и может вернуться

	if (auth) {
		return <Navigate to={getRouteMain()} state={{ from: location }} replace />
	}

	return children
}