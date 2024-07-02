import { App } from "@/components/App";
import { LazyAboutPage } from "@/pages/about/about-page.lazy";
import { LazyErrorPage } from "@/pages/error/error-page.lazy";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const routes = [
  {
    path: "/admin",
    element: <App />,
    errorElement: (
      <Suspense fallback="Loading...">
        <LazyErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: "/admin/about",
        element: (
          <Suspense fallback="Loading...">
            <LazyAboutPage />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
