import { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { BuildOptions } from './types/types'

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    open: true,
    hot: true,
    // Работает только через dev сервер. если раздавать статику через ngnix, то надо делать проксирование на Index.html
    historyApiFallback: true // для rrd
  }
}
