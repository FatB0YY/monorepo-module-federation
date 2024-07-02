// ------------------- STYLES

declare module '*.scss' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}

// -------------------

// ------------------- FILES

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'

// -------------------

// ------------------- CONST

declare const __IS_DEV__: boolean
declare const __API_URL__: string
declare const __PROJECT__: 'sb' | 'client' | 'jest'

// -------------------

// ------------------- TYPES

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T
}

// -------------------

// ------------------- OTHER

declare module 'storybook-addon-mock'

// -------------------
