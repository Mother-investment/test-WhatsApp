import React from 'react'
import { createRoot } from 'react-dom/client'
import { StoreProvider } from './app/providers/StoreProvider'
import App from './app/App'
import '../src/app/styles/index.scss'
import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('Failed to find the root element')

const root = createRoot(rootElement)

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<StoreProvider>
				<App />
			</StoreProvider>
		</BrowserRouter>
	</React.StrictMode>
)