import { lazy } from "react";
const Main = lazy(() => import("../pages/Main"));
const Emails = lazy(() => import("../components/emails"));
const ViewEmail = lazy(() => import("../components/viewEmail"));
const Login = lazy(() => import("../authorization/login"));
const SignUp = lazy(() => import("../authorization/signup"));

const routes = {
  main: { path: "/", element: Main },
  emails: { path: "/emails", element: Emails },
  view: { path: "/view", element: ViewEmail },
  login: { path: "/login", element: Login },
  signup: { path: "/signup", element: SignUp },
  invalid: { path: "/*", element: Main },
};

export { routes };
