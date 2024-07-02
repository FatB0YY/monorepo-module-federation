# Документация WebPack

## Плагины

Функция в файле `buildPlugins` возвращает массив плагинов в зависимости от сборки проекта (dev/prod).

### Основные плагины (независимо от типа сборки):

1. **HtmlWebpackPlugin**:
   - `template`: ссылка до нашего HTML-файла, который будет использоваться в качестве шаблона.
   - `favicon`: путь до favicon.
2. **webpack.DefinePlugin**: плагин, где мы указываем глобальные константы.
3. **Dotenv**: плагин для работы с `.env` файлами.

### Плагины для production:

1. **BundleAnalyzerPlugin**: анализ размера бандла.
2. **MiniCssExtractPlugin**: сжатие CSS.
3. **CopyPlugin**: копирование статики, например, папку с переводами.

### Плагины для development:

1. **webpack.ProgressPlugin**: показывает проценты сборки.
2. **ForkTsCheckerWebpackPlugin**:
   - **semantic**: `true` - включает семантические проверки TypeScript.
   - **syntactic**: `true` - включает синтаксические проверки TypeScript.
   - **mode**: `'write-references'` - генерирует `tsconfig.tsbuildinfo` файлы для ускорения последующих сборок.
3. **ReactRefreshWebpackPlugin**: добавляет поддержку "быстрого обновления" для React-компонентов.
4. **CircularDependencyPlugin**: плагин для нахождения циркулярных зависимостей в компонентах.

## ENV переменные

В `package.json` в секции `scripts` указаны все ENV-переменные, необходимые для `webpack.config`. Также используется `DotenvPlugin`, который подгружает в зависимости от mode (`dev/prod`) правильный `.env` файл (`.env.dev/.env.prod`), и эти переменные можно использовать внутри `src`.

## Лоадеры

Обрабатываем файлы за рамки js (`png`, `css`, `scss`, `svg`, `ts`) в файле `buildLoader`.

1. **svgrLoader** (`@svgr/webpack`): лоадер для работы с SVG, плагин `convertColors` упрощает работу с цветами для SVG иконок.
2. **cssLoader**:
   - В режиме `isDevMode` (development) используется `style-loader`, который встраивает CSS в DOM с помощью тега `<style>`.
   - В режиме `!isDevMode` используется `MiniCssExtractPlugin.loader`, который извлекает CSS в отдельные файлы для кэширования и асинхронной загрузки.
   - **css-loader**: анализирует `@import` и `url()` в CSS и обрабатывает их как модули JavaScript.
   - Файлы с `.module.` в названии обрабатываются как CSS-модули.
     - `localIdentName`: шаблон для именования локальных CSS-классов.
   - **postcss-loader**: добавляет плагины, например, `autoprefixer`.
   - **sass-loader**: компилирует SCSS или SASS в обычный CSS.
3. **babelLoader**:
   - **@babel/plugin-transform-typescript**: трансформация TypeScript в JavaScript.
     - Опция `isTSX` указывает, что следует обрабатывать файлы `.tsx`.
   - **@babel/plugin-transform-runtime**: оптимизация кода с использованием Babel runtime.
   - В режиме `isProdMode` и `isTsx` используется `removeDataTestIdBabelPlugin`, который удаляет атрибуты `data-testid` из JSX элементов.
   - Пресеты для `js`, `ts`, и `react`.
4. **assetLoader**
5. **fontsLoader**

## Резолвинг

1. **extensions**: `['.tsx', '.ts', '.js']` - массив расширений файлов, которые автоматически добавляются при резолвинге модулей. Это позволяет импортировать модули без указания их расширения.
2. **preferAbsolute**: `true` - Webpack сначала пытается разрешить абсолютные пути, затем относительные и модульные пути.
3. **mainFiles**: `['index']` - массив имен файлов, которые Webpack будет использовать по умолчанию при резолвинге директории. Например, при импорте директории Webpack будет искать файл `index` в этой директории.
4. **алиасы**: настройки для сокращения путей при импорте модулей.
