import { ForgotPassword } from "@/features/auth/forgotPassword";
import { LoginPage } from "@/features/auth/loginPage";
import { RegisterPage } from "@/features/auth/registerPage";
import { ResetPassword } from "@/features/auth/resetPassword";
import { ProductPage } from "@/features/product/productPage";
import { Settings } from "@/features/profile/settings";
import RootLayout from "@/layout/rootLayout";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";

const route: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ProductPage />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: `/reset-password`,
    element: <ResetPassword />,
  },
];

export default function Router() {
  return <RouterProvider router={createBrowserRouter(route)} />;
}
