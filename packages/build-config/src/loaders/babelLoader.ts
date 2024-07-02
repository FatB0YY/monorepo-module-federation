import { BuildOptions } from '../types/types'
import { removeDataTestIdBabelPlugin } from './removeDataTestIdBabelPlugin'

interface BuildBabelLoaderProps extends BuildOptions {
  isTsx: boolean
}

export function buildBabelLoader({
  isDevMode,
  isProdMode,
  isTsx
}: BuildBabelLoaderProps) {
  const plugins: unknown[] = [
    [
      '@babel/plugin-transform-typescript',
      {
        isTSX: isTsx
      }
    ],
    '@babel/plugin-transform-runtime'
  ]

  if (isProdMode && isTsx) {
    plugins.push([
      removeDataTestIdBabelPlugin,
      {
        props: ['data-testid']
      }
    ])
  }

  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      // cacheDirectory: true,
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: false // важно для '@babel/plugin-transform-runtime'
            }
          ],
          '@babel/preset-typescript',
          [
            '@babel/preset-react',
            {
              runtime: isDevMode ? 'automatic' : 'classic'
            }
          ]
        ],
        plugins: plugins
      }
    }
  }
}
