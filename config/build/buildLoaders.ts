import type { RuleSetRule } from 'webpack'
import { BuildOptions } from './types/config'
import { buildCssLoader } from './loaders/buildCssLoader'

export function buildLoaders({ isDev }: BuildOptions): RuleSetRule[] {
	const svgLoader = {
		test: /\.svg$/,
		use: ['@svgr/webpack']
	}

	const cssLoader = buildCssLoader(isDev)

	const typescriptLoader = {
		test: /\.tsx?$/,
		use: [{
			loader: 'ts-loader',
			options: {
				transpileOnly: true
			}
		}],
		exclude: /node_modules/
	}

	const fileLoader = {
		test: /\.(|woff2|woff)$/i,
		use: [
			{
				loader: 'file-loader'
			}
		]
	}

	return [
		fileLoader,
		svgLoader,
		typescriptLoader,
		cssLoader
	]
}
