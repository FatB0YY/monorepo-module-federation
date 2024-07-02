export type BuildMode = 'production' | 'development'

export interface BuildPaths {
  entry: string
  build: string
  html: string
  public: string
  src: string
}

export interface BuildEnv {
  MODE: BuildMode
  PORT: number

  // urls
  SERVER_API_URL?: string
  SHOP_REMOTE_URL?: string
  ADMIN_REMOTE_URL?: string
}

export enum BuildProjectTypes {
  SB = 'sb', // storybook
  CLIENT = 'client',
  JEST = 'jest'
}

export interface BuildOptions {
  mode: BuildMode
  paths: BuildPaths
  isDevMode: boolean
  isProdMode: boolean
  port: number
  serverApiUrl: string
  buildProjectType: BuildProjectTypes
}
