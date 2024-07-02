import path from 'path'

import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import Dotenv from 'dotenv-webpack'

import { BuildOptions } from './types/types'

export function buildPlugins({
  paths,
  isDevMode,
  serverApiUrl,
  buildProjectType,
  isProdMode
}: BuildOptions): webpack.WebpackPluginInstance[] {
  let envFile = getEnvFile(isDevMode, isProdMode)

  const plugins: webpack.WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, 'favicon.ico'),
      publicPath: '/' // при микрофронтах, то откуда будет статитика запрашиваться
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDevMode),
      __API_URL__: JSON.stringify(serverApiUrl),
      __PROJECT__: JSON.stringify(buildProjectType)
    }),
    new Dotenv({
      path: envFile
    })
  ]

  if (isProdMode) {
    plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: true
      })
    )
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[name].[contenthash].css'
      })
    )
    plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(paths.public, 'locales'),
            to: path.resolve(paths.build, 'locales')
          }
        ]
      })
    )
  }

  if (isDevMode) {
    plugins.push(new webpack.ProgressPlugin())
    plugins.push(
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true
          },
          mode: 'write-references'
        }
      })
    )
    plugins.push(
      new ReactRefreshWebpackPlugin({
        overlay: {
          sockIntegration: 'wds' // использование Webpack Dev Server
        }
      })
    )
    plugins.push(
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        failOnError: false
      })
    )
  }

  return plugins
}

function getEnvFile(isDevMode: boolean, isProdMode: boolean) {
  if (isDevMode) return '.env.dev'
  if (isProdMode) return '.env.prod'

  return '.env.dev'
}
