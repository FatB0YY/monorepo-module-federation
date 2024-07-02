import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function buildCssLoader(isDevMode: boolean) {
  return {
    test: /\.s[ac]ss$/i,
    use: [
      isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            localIdentName: isDevMode
              ? '[path][name]__[local]--[hash:base64:5]'
              : '[hash:base64:8]'
          }
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: ['autoprefixer']
          }
        }
      },
      'sass-loader'
    ]
  }
}
