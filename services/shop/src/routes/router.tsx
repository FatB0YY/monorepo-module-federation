import { App } from "@/components/App";
import { LazyErrorPage } from "@/pages/error/error-page.lazy";
import { LazyShopPage } from "@/pages/shop/shop-page.lazy";
import { Suspense } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/shop",
    element: <App />,
    errorElement: (
      <Suspense fallback="Loading...">
        <LazyErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: "/shop/main",
        element: (
          <Suspense fallback="Loading...">
            <LazyShopPage />
          </Suspense>
        ),
      },
      {
        path: "/shop/second",
        element: (
          <Suspense fallback="Loading...">
            <h1>Second page shop</h1>
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes; // с помощью дефолта подключаем роуты в host контейнер
