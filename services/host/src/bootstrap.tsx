import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "@/routes/router";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root not found");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
