import webpack from 'webpack'
import { buildCssLoader } from './loaders/buildCssLoader'
import { BuildOptions } from './types/types'
import { buildBabelLoader } from './loaders/babelLoader'

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const svgrLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true
                }
              }
            ]
          }
        }
      }
    ]
  }

  const cssLoader = buildCssLoader(options.isDevMode)

  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false })
  const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true })

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource'
  }

  const fontsLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource'
  }

  return [
    assetLoader,
    fontsLoader,
    svgrLoader,
    codeBabelLoader,
    tsxCodeBabelLoader,
    cssLoader
  ]
}
