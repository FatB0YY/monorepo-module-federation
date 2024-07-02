import * as webpack from 'webpack'

import { BuildOptions } from './types/types'
import { buildPlugins } from './buildPlugins'
import { buildLoaders } from './buildLoaders'
import { buildResolvers } from './buildResolvers'
import { buildDevServer } from './buildDevServer'

// ф-ция для сборки конфига
export function buildWebpackConfig(
  options: BuildOptions
): webpack.Configuration {
  const { paths, mode, isDevMode } = options

  return {
    mode: mode,
    entry: paths.entry,
    output: {
      filename: 'js/[name].[contenthash].js',
      path: paths.build,
      clean: true,
      publicPath: '/'
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options)
    },
    resolve: buildResolvers(options),
    devtool: isDevMode ? 'inline-source-map' : undefined,
    devServer: isDevMode ? buildDevServer(options) : undefined,
    stats: {
      warningsFilter: /export .* was not found in/
    }
    // performance: {
    //   hints: true,
    //   maxEntrypointSize: 512000,
    //   maxAssetSize: 512000
    // }
  }
}
