import { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Loader } from 'shared/ui/Loader/Loader'
import { AppRouter } from './providers/router'
import { getIsInited, authByIdToken } from 'features/AuthByIdToken'
import { ID_AND_TOKEN_LOCALSTORAGE_KEY } from 'shared/const/localstorage'
import { AuthData } from 'features/AuthByIdToken/model/types/LoginSchema'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { loginActions } from 'features/AuthByIdToken/model/slice/loginSlice'

const App = () => {
	const dispatch = useAppDispatch()
	const inited = useSelector(getIsInited)

	useEffect(() => {
		const authDataLK = localStorage.getItem(ID_AND_TOKEN_LOCALSTORAGE_KEY)
		if(authDataLK) {
			const authData: AuthData = JSON.parse(authDataLK)
			dispatch(authByIdToken(authData))
		} else {
			dispatch(loginActions.initialize())
		}
	}, [dispatch])

	return (
		<div className='app' id='app'>
			<Suspense fallback={<Loader/>}>
				<div className='content'>
					{inited && <AppRouter />}
				</div>
			</Suspense>
		</div>
	)
}
export default App
