import * as Babel from '@babel/core'

export function removeDataTestIdBabelPlugin(): Babel.PluginItem {
  return {
    visitor: {
      Program(path, state) {
        const forbiddenProps = state.opts.props || []

        path.traverse({
          JSXIdentifier(current) {
            const nodeName = current.node.name

            if (forbiddenProps.includes(nodeName)) {
              current.parentPath.remove()
            }
          }
        })
      }
    }
  }
}
