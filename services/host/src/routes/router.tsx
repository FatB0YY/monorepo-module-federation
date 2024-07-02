import { App } from "@/components/App";
import { LazyErrorPage } from "@/pages/error/error-page.lazy";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

//@ts-ignore
import shopRoutes from "shop/Router";
//@ts-ignore
import adminRoutes from "admin/Router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <Suspense fallback="Loading...">
        <LazyErrorPage />
      </Suspense>
    ),
    // ВАЖНО!!! Сюда добавляем дочерние приложения
    children: [...shopRoutes, ...adminRoutes],
  },
]);
