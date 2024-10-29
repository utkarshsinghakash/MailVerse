import { useState } from "react";
import "./App.css";

import { Suspense, lazy } from "react";
import SuspenseLoader from "./Error/suspenseLoader";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  Navigate,
  createRoutesFromElements,
} from "react-router-dom";
import { routes } from "./routes/routes";

const Error = lazy(() => import("./Error/Error"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={routes.login.path} element={<routes.login.element />} />
      <Route path={routes.signup.path} element={<routes.signup.element />} />
      <Route
        path={routes.main.path}
        element={<Navigate to={`${routes.emails.path}/inbox`} />}
      />
      <Route path={routes.main.path} element={<routes.main.element />}>
        <Route
          path={`${routes.emails.path}/:type`}
          element={<routes.emails.element />}
          errorElement={<Error />}
        />
        <Route
          path={routes.view.path}
          element={<routes.view.element />}
          errorElement={<Error />}
        />
      </Route>
      <Route
        path={routes.invalid.path}
        element={<Navigate to={`${routes.emails.path}/inbox`} />}
      />
    </Route>
  )
);

function App() {
  return (
    <>
      <Suspense fallback={<SuspenseLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
