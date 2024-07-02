import path from "path";
import webpack from "webpack";
import {
  BuildEnv,
  BuildMode,
  BuildOptions,
  BuildPaths,
  BuildProjectTypes,
  buildWebpackConfig,
} from "@packages/build-config";
import packageJson from "./package.json";

export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"), // стартовая точка приложения
    build: path.resolve(__dirname, "build"), // путь до build/dist папки
    html: path.resolve(__dirname, "public", "index.html"),
    public: path.resolve(__dirname, "public"),
    src: path.resolve(__dirname, "src"), // путь до исходного кода приложения
  };

  const mode = env.MODE;
  const port = env.PORT;

  const serverApiUrl = env.SERVER_API_URL || "http://localhost:8000";

  const isDevMode = mode === "development";
  const isProdMode = mode === "production";

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDevMode,
    isProdMode,
    port,
    serverApiUrl,
    buildProjectType: BuildProjectTypes.CLIENT,
  });

  config.plugins?.push(
    new webpack.container.ModuleFederationPlugin({
      name: "admin", // название микрофронтенда
      filename: "remoteEntry.js", // название файла, который будет удаленно подключаться в host контейнер
      exposes: {
        "./Router": "./src/routes/router.tsx",
      }, // указываем, что мы хотим предоставить приложению-контейнеру
      shared: {
        // какие библиотеки общие и какие должны шариться
        ...packageJson.dependencies,
        react: {
          eager: true, // говорит о том, что эту библиотеку нужно подгрузить сразу, не lazy
          requiredVersion: packageJson.dependencies["react"],
        },
        "react-router-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-router-dom"],
        },
        "react-dom": {
          eager: true,
          requiredVersion: packageJson.dependencies["react-dom"],
        },
      },
    })
  );

  return config;
};
